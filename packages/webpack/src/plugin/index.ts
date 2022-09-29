import path from "path";
import { ResolveContext } from "enhanced-resolve";

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
import { createProjectMatcher } from "./matchers";

export default class UnitedPlugin implements ResolvePluginInstance {
	public readonly name = "UnitedPlugin";
	public readonly source = "described-resolve";
	public readonly target = "resolve";

	protected config!: Config;
	protected targetHook!: Hook;
	protected sourceHook!: Hook;
	protected resolver!: Resolver;
	protected matchersCache = new Map<string, Matcher>();

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

	protected async getMatcher(project: Project): Promise<Matcher> {
		if (this.matchersCache.has(project.name)) {
			return this.matchersCache.get(project.name) as Matcher;
		}

		const matcher = await createProjectMatcher(project, this.resolver);
		this.matchersCache.set(project.name, matcher);

		return matcher;
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

		const matcher = await this.getMatcher(project);
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
