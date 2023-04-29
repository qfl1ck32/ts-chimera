import { ServiceToken } from '@ts-phoenix/core';

import { ICLIService } from './defs';

export const TEMPLATES_DIRECTORY = './templates/';

export const CLIServiceToken = ServiceToken<ICLIService>('CLIService');
