import { Container, Token } from '@ts-phoenix/di';

import { CONFIG_TOKEN_IDENTIFIER } from './constants';

export const CONTAINER = new Token<Container>('CONTAINER');

export class PackageConfigToken<T> extends Token<T> {
  constructor(
    /**
     * The name of the package that this token belongs to.
     * This is used to identify the token in error messages.
     * Format: PACKAGE_NAME
     * Example: 'REACT_I18N'
     */
    packageName: string,
  ) {
    super(`${CONFIG_TOKEN_IDENTIFIER} ${packageName}`);
  }
}
