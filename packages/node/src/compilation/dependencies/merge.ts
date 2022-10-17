import { PackageJson } from "~/common";

export const mergeDependencies = (
	mainPackageJson: PackageJson,
	secondPackageJson: PackageJson
): PackageJson => {
	const {
		dependencies,
		peerDependencies,
		optionalDependencies,
		bundledDependencies,
		devDependencies: _,
		...rest
	} = mainPackageJson;

	const {
		dependencies: dependencies2,
		peerDependencies: peerDependencies2,
		optionalDependencies: optionalDependencies2,
		bundledDependencies: bundledDependencies2,
	} = secondPackageJson;

	return {
		...rest,
		dependencies: {
			...dependencies2,
			...dependencies,
		},
		peerDependencies: {
			...peerDependencies2,
			...peerDependencies,
		},
		optionalDependencies: {
			...optionalDependencies2,
			...optionalDependencies,
		},
		bundledDependencies: [
			...(bundledDependencies2 ?? []),
			...(bundledDependencies ?? []),
		],
	};
};
