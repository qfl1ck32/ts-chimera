import { CONFIG_TOKEN_IDENTIFIER, SERVICE_TOKEN_IDENTIFIER } from './constants';
import { ServiceIdentifier } from './defs';
export const Token = <T>(name: string): ServiceIdentifier<T> => Symbol(name);

export const PackageConfigToken = <T>(packageName: string) =>
  Token<T>(`${CONFIG_TOKEN_IDENTIFIER} ${packageName}`);

export const ServiceToken = <T>(serviceName: string) =>
  Token<T>(`${SERVICE_TOKEN_IDENTIFIER} ${serviceName}`);
