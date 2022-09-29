import { isParent, traverseDir } from "~/common";

export const traverseOut = async (
	outDir: string,
	declarationDir?: string,
	exclude?: string[]
): Promise<string[]> => {
	if (declarationDir && isParent(outDir, declarationDir)) {
		declarationDir = undefined;
	}

	if (declarationDir) {
		const [outFiles, declarationFiles] = await Promise.all([
			traverseDir(outDir, exclude),
			traverseDir(declarationDir, exclude),
		]);

		return [...outFiles, ...declarationFiles];
	}

	return traverseDir(outDir, exclude);
};
