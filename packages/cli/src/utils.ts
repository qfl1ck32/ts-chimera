import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export const findPackageRoot = (currentDir: string): string => {
  if (fs.existsSync(path.join(currentDir, 'package.json'))) {
    return currentDir;
  }

  const parentDir = path.dirname(currentDir);
  if (parentDir === currentDir) {
    throw new Error("Couldn't find package root");
  }

  return findPackageRoot(parentDir);
};

export const runCommand = (command: string, directory: string) => {
  return execSync(command, { cwd: directory });
};
