import { Logger } from '@ts-phoenix/logger';

import core from '@src/startup/core';

core.initialise().then(async () => {
  const logger = core.container.get(Logger).getWithPrefix('Application');

  await logger.info('The application has started.');
});
