import { join } from 'path';

import { Injectable } from '@ts-phoenix/di';

import { TEMPLATES_DIRECTORY } from '@src/constants';
import { findPackageRoot, runCommand } from '@src/utils';

import { Writer } from './writer';

export interface CreateFrontendMicroserviceArgs {
  name: string;
}

@Injectable()
export class MicroserviceWriter extends Writer {
  async createFrontend(args: CreateFrontendMicroserviceArgs) {
    const nameTemplate = 'my-frontend-app';

    const srcDir = join(
      findPackageRoot(__dirname),
      TEMPLATES_DIRECTORY,
      'front-end',
    );

    const destDir = join(process.cwd(), args.name);

    this.copyTemplate(
      srcDir,
      destDir,
      ['.next', 'node_modules'],
      [
        {
          original: nameTemplate,
          new: args.name,
        },
      ],
    );

    this.logger.info('Installing dependencies...');
    runCommand('npm i', destDir);
  }
}
