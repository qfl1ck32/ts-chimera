import { CustomLoggerServiceToken, LoggerPackage } from '@ts-phoenix/logger';

import core from '@src/startup/core';

core.initialise().then(async () => {
  const logger = core.container.get(CustomLoggerServiceToken);

  logger.setPrefix('App');

  await logger.info('The application has started.');
});
