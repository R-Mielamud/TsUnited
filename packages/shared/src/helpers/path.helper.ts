import path from "path";
import fs from "fs/promises";

export const traverseDir = async (
	dir: string,
	exclude?: string[]
): Promise<string[]> => {
	const paths: string[] = [];
	const items = await fs.readdir(dir, { withFileTypes: true });

	await Promise.all(
		items.map(async (file) => {
			if (exclude && exclude.includes(file.name)) {
				return;
			}

			const itemPath = path.resolve(dir, file.name);

			if (file.isFile()) {
				paths.push(itemPath);
			}

			if (file.isDirectory()) {
				paths.push(...(await traverseDir(itemPath)));
			}
		})
	);

	return paths;
};

export const isParent = (parent: string, child: string): boolean => {
	const relative = path.relative(parent, child);

	return Boolean(!relative.startsWith("..") && !path.isAbsolute(relative));
};
