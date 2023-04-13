import { Core } from '@ts-chimera/core';

import { CLI } from './service';
import { CLIPackage } from './package';

const main = async () => {
  const core = new Core({
    packages: [new CLIPackage()],
  });

  await core.initialise();

  const cli = core.container.get(CLI);

  await cli.run();
};

main();
