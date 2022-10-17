import path from "path";
import { Compiler } from "webpack";
import { AbortController } from "node-abort-controller";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { FilesChange } from "fork-ts-checker-webpack-plugin/lib/files-change";
import { GetIssuesWorker } from "fork-ts-checker-webpack-plugin/lib/typescript/worker/get-issues-worker";
import { GetDependenciesWorker } from "fork-ts-checker-webpack-plugin/lib/typescript/worker/get-dependencies-worker";
import { interceptDoneToGetDevServerTap } from "fork-ts-checker-webpack-plugin/lib/hooks/intercept-done-to-get-dev-server-tap";
import { tapAfterCompileToGetIssues } from "fork-ts-checker-webpack-plugin/lib/hooks/tap-after-compile-to-get-issues";
import { tapDoneToAsyncGetIssues } from "fork-ts-checker-webpack-plugin/lib/hooks/tap-done-to-async-get-issues";
import { getPluginHooks } from "fork-ts-checker-webpack-plugin/lib/plugin-hooks";
import { assertTypeScriptSupport } from "fork-ts-checker-webpack-plugin/lib/typescript/type-script-support";
import { tapAfterCompileToAddDependencies } from "fork-ts-checker-webpack-plugin/lib/hooks/tap-after-compile-to-add-dependencies";
import { tapAfterEnvironmentToPatchWatching } from "fork-ts-checker-webpack-plugin/lib/hooks/tap-after-environment-to-patch-watching";
import { tapErrorToLogMessage } from "fork-ts-checker-webpack-plugin/lib/hooks/tap-error-to-log-message";
import { tapStopToTerminateWorkers } from "fork-ts-checker-webpack-plugin/lib/hooks/tap-stop-to-terminate-workers";
import { aggregateFilesChanges } from "fork-ts-checker-webpack-plugin/lib/files-change";

import {
	createRpcWorker,
	RpcWorker,
} from "fork-ts-checker-webpack-plugin/lib/rpc";

import {
	createPluginConfig,
	ForkTsCheckerWebpackPluginConfig,
} from "fork-ts-checker-webpack-plugin/lib/plugin-config";

import {
	createPluginState,
	ForkTsCheckerWebpackPluginState,
} from "fork-ts-checker-webpack-plugin/lib/plugin-state";

import {
	dependenciesPool,
	issuesPool,
} from "fork-ts-checker-webpack-plugin/lib/plugin-pools";

import {
	Config,
	convertForwardSlashes,
	ForkTsCheckerConfig,
	Project,
	SUPPRESSED_DIAGNOSTICS,
} from "~/common";

import { getCachedTsconfig } from "~/runtime";
import { consumeFilesChange } from "./overrides/files-change";

export default class ProjectForkTsCheckerPlugin extends ForkTsCheckerWebpackPlugin {
	public readonly name = "ProjectForkTsCheckerPlugin";

	public constructor(
		config: Config,
		mainProject: Project,
		forkTsCheckerConfig: ForkTsCheckerConfig = {}
	) {
		const existingExclusions = forkTsCheckerConfig.issue?.exclude;

		const arrayExistingExclusions = !existingExclusions
			? []
			: Array.isArray(existingExclusions)
			? existingExclusions
			: [existingExclusions];

		const projectExclusions = config.projects
			.filter((project) => project.name !== mainProject.name)
			.map((project) => ({
				file: convertForwardSlashes(
					path.join(
						path.relative(mainProject.path, project.path),
						"**",
						"*.*"
					)
				),
			}));

		const diagnosticExclusions = SUPPRESSED_DIAGNOSTICS.map((code) => ({
			code: `TS${code}`,
		}));

		super({
			...forkTsCheckerConfig,
			typescript: {
				...forkTsCheckerConfig.typescript,
				context: mainProject.path,
				configFile: getCachedTsconfig(mainProject).path,
			},
			issue: {
				...forkTsCheckerConfig.issue,
				exclude: [
					...arrayExistingExclusions,
					...projectExclusions,
					...diagnosticExclusions,
				],
			},
		});
	}

	public override apply(compiler: Compiler) {
		const config = createPluginConfig(
			compiler,
			// TypeScript says that options are inaccessible, but technically they're accessible
			(this as any).options
		);

		const state = createPluginState();

		assertTypeScriptSupport(config.typescript);

		const getIssuesWorker = createRpcWorker<GetIssuesWorker>(
			require.resolve(
				"fork-ts-checker-webpack-plugin/lib/typescript/worker/get-issues-worker"
			),
			config.typescript,
			config.typescript.memoryLimit
		);

		const getDependenciesWorker = createRpcWorker<GetDependenciesWorker>(
			require.resolve(
				"fork-ts-checker-webpack-plugin/lib/typescript/worker/get-dependencies-worker"
			),
			config.typescript
		);

		tapAfterEnvironmentToPatchWatching(compiler, state);

		this.tapStartToRunWorkers(
			compiler,
			getIssuesWorker,
			getDependenciesWorker,
			config,
			state
		);

		tapAfterCompileToAddDependencies(compiler, config, state);

		tapStopToTerminateWorkers(
			compiler,
			getIssuesWorker,
			getDependenciesWorker,
			state
		);

		tapErrorToLogMessage(compiler, config);
	}

	protected tapStartToRunWorkers(
		compiler: Compiler,
		getIssuesWorker: RpcWorker<GetIssuesWorker>,
		getDependenciesWorker: RpcWorker<GetDependenciesWorker>,
		config: ForkTsCheckerWebpackPluginConfig,
		state: ForkTsCheckerWebpackPluginState
	) {
		const hooks = getPluginHooks(compiler);

		compiler.hooks.run.tap(this.name, () => {
			if (!state.initialized) {
				state.initialized = true;
				state.watching = false;

				tapAfterCompileToGetIssues(compiler, config, state);
			}
		});

		compiler.hooks.watchRun.tap(this.name, async () => {
			if (!state.initialized) {
				state.initialized = true;
				state.watching = true;

				if (config.async) {
					tapDoneToAsyncGetIssues(compiler, config, state);
					interceptDoneToGetDevServerTap(compiler, config, state);
				} else {
					tapAfterCompileToGetIssues(compiler, config, state);
				}
			}
		});

		compiler.hooks.compilation.tap(this.name, async (compilation) => {
			if (compilation.compiler !== compiler) {
				return;
			}

			++state.iteration;

			if (state.abortController) {
				state.abortController.abort();
			}

			const abortController = new AbortController();

			state.abortController = abortController;

			let filesChange: FilesChange = {};

			if (state.watching) {
				filesChange = consumeFilesChange(compiler);
			}

			filesChange = await hooks.start.promise(filesChange, compilation);

			let aggregatedFilesChange = filesChange;

			if (state.aggregatedFilesChange) {
				aggregatedFilesChange = aggregateFilesChanges([
					aggregatedFilesChange,
					filesChange,
				]);
			}

			state.aggregatedFilesChange = aggregatedFilesChange;

			state.issuesPromise = (state.issuesPromise ?? Promise.resolve())
				.catch(() => undefined)
				.then(() => {
					if (abortController.signal.aborted) {
						return;
					}

					return issuesPool.submit(async () => {
						try {
							const issues = await getIssuesWorker(
								aggregatedFilesChange,
								state.watching
							);

							if (
								state.aggregatedFilesChange ===
								aggregatedFilesChange
							) {
								state.aggregatedFilesChange = undefined;
							}

							if (state.abortController === abortController) {
								state.abortController = undefined;
							}
							return issues;
						} catch (error) {
							hooks.error.call(error, compilation);
						}
					}, abortController.signal);
				});

			state.dependenciesPromise = dependenciesPool.submit(async () => {
				try {
					return await getDependenciesWorker(filesChange);
				} catch (error) {
					hooks.error.call(error, compilation);
				}
			});
		});
	}
}
