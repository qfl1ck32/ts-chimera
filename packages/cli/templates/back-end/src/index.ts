import { CustomLogger } from '@ts-phoenix/logger';

import core from './startup/core';

core.initialise().then(() => {
  const logger = core.container.get(CustomLogger);

  logger.setPrefix('Application');

  logger.info('The application has started.');
});
