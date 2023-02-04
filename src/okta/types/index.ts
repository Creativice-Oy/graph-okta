export * from './applications';
export * from './client';
export * from './devices';
export * from './groups';
export * from './logs';
export * from './roles';
export * from './rules';
export * from './support';
export * from './users';
export * from './policies';

/**
 * Account information derived from the domain/url.
 */
export interface OktaAccountInfo {
  name: string;
  preview: boolean;
}

export interface OktaResource {
  id: string;
}
