import path from "path";

export const isParent = (parent: string, child: string): boolean => {
	const relative = path.relative(parent, child);

	return Boolean(
		relative && !relative.startsWith("..") && !path.isAbsolute(relative)
	);
};
