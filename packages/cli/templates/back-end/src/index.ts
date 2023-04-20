import { Logger } from '@ts-phoenix/logger';

import core from './startup/core';

core.initialise().then(() => {
  const logger = core.container.get(Logger).getWithPrefix('Application');

  logger.info('The application has started.');
});
