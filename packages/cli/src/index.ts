import { Core } from '@ts-phoenix/core';

import { CLIPackage } from './package';
import { CLI } from './service';

const main = async () => {
  const core = new Core({
    packages: [new CLIPackage()],
  });

  await core.initialise();

  const cli = core.container.get(CLI);

  await cli.run();
};

main();
