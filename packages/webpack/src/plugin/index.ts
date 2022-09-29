import fs from "fs";
import path from "path";
import { ResolveContext } from "enhanced-resolve";

import {
	createMatchPathAsync,
	FileExistsAsync,
	ReadJsonAsync,
} from "tsconfig-paths";

import { ResolvePluginInstance, Resolver } from "webpack";

import {
	Config,
	resolveConfig,
	getProjectByPath,
	Hook,
	Matcher,
	Project,
	ResolveRequest,
	validateConfig,
	NoProjectContainsPathError,
} from "~/common";
import { getCachedTsconfig } from "~/runtime";

export default class UnitedPlugin implements ResolvePluginInstance {
	public readonly name = "UnitedPlugin";
	public readonly source = "described-resolve";
	public readonly target = "resolve";
	public readonly defaultExtensions = [".js", ".ts", ".tsx", ".json"];

	protected config!: Config;
	protected targetHook!: Hook;
	protected sourceHook!: Hook;
	protected resolver!: Resolver;
	protected matchersInitialized = false;
	protected matchers = new Map<string, Matcher>();

	public constructor(config: Config) {
		validateConfig(config);
		this.config = resolveConfig(config);
	}

	public apply(resolver: Resolver) {
		this.sourceHook = resolver.getHook(this.source);
		this.targetHook = resolver.ensureHook(this.target);
		this.resolver = resolver;

		this.tapResolve();
	}

	protected async initMatchers() {
		if (this.matchersInitialized) {
			return;
		}

		this.matchersInitialized = true;

		await Promise.all(
			this.config.projects.map(async (project) => {
				const matcher = await this.createProjectMatcher(project);

				this.matchers.set(project.name, matcher);
			})
		);
	}

	protected async createProjectMatcher(project: Project): Promise<Matcher> {
		const tsconfig = await getCachedTsconfig(project);
		const extensions = this.getProjectExtensions(project);

		if (!tsconfig.options.baseUrl) {
			return {
				match: async (request) => request,
				tsconfig,
			};
		}

		const match = createMatchPathAsync(
			tsconfig.options.baseUrl,
			tsconfig.options.paths ?? {},
			["main"]
		);

		const readJson: ReadJsonAsync = (file, callback) => {
			if (this.resolver.fileSystem.readJson) {
				return this.resolver.fileSystem.readJson(file, (err, data) =>
					callback(err as Error | undefined, data)
				);
			}

			fs.readFile(file, (err, result) => {
				if (err) {
					return callback(err);
				}

				callback(undefined, JSON.parse(result.toString("utf-8")));
			});
		};

		const fileExists: FileExistsAsync = (file, callback) => {
			fs.stat(file, (err) => callback(undefined, !err));
		};

		return {
			match: (request: string) =>
				new Promise((resolve, reject) => {
					match(
						request,
						readJson,
						fileExists,
						extensions,
						(err, result) => {
							if (err) {
								return reject(err);
							}

							resolve(result);
						}
					);
				}),
			tsconfig,
		};
	}

	protected getProjectExtensions(project: Project): string[] {
		return project.extensions ?? this.defaultExtensions;
	}

	protected tapResolve() {
		this.sourceHook.tapPromise(
			this.name,
			this.handleRequest.bind(this) as any // Issue in webpack types. We need to return undefined, not null
		);
	}

	protected async handleRequest(
		req: ResolveRequest,
		context: ResolveContext
	): Promise<ResolveRequest | undefined> {
		await this.initMatchers();

		const project = getProjectByPath(req.path, this.config);

		if (!project) {
			throw new NoProjectContainsPathError(req.path);
		}

		return this.resolveFor(project, req, context);
	}

	protected async resolveFor(
		project: Project,
		req: ResolveRequest,
		context: ResolveContext
	): Promise<ResolveRequest | undefined> {
		if (
			!req.request ||
			req.request.startsWith(".") ||
			path.isAbsolute(req.request)
		) {
			return;
		}

		const matcher = this.matchers.get(project.name) as Matcher;
		const matchedPath = await matcher.match(req.request);

		if (!matchedPath) {
			return;
		}

		const newRequest: ResolveRequest = {
			...req,
			path: matcher.tsconfig.options.baseUrl as string,
			request: matchedPath,
		};

		return this.resolve(newRequest, context);
	}

	protected resolve(
		req: ResolveRequest,
		context: ResolveContext
	): Promise<ResolveRequest | undefined> {
		return new Promise((resolve, reject) => {
			this.resolver.doResolve(
				this.targetHook,
				req,
				null,
				context,
				(err: Error | null, result: ResolveRequest) => {
					if (err) {
						return reject(err);
					}

					resolve(result);
				}
			);
		});
	}
}
