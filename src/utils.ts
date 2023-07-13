import { readdirSync, statSync } from 'fs';

type FilterFunction = (file: String) => boolean;
export const walkDir = (folder: string, filter: FilterFunction | undefined, relativeDir = ""): string[] => {
    if (!folder) return [];
    let files = [];
    for (const file of readdirSync(folder)) {
        const stat = statSync(`${folder}/${file}`);
        if (stat.isDirectory()) {
            files = files.concat(walkDir(`${folder}/${file}`, filter, `${relativeDir}/${file}`));
        } else if (!filter || filter(file)) {
            files.push(`${relativeDir}/${file}`);
        }
    }
    return files;
}