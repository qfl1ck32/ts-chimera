import { Core } from '@ts-phoenix/core';

import { CLI } from './service';

const main = async () => {
  const core = new Core({
    packages: [],
  });

  await core.initialise();

  const cli = core.container.get(CLI);

  await cli.run();
};

main();
