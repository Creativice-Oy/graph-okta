import { OktaResource } from '.';

export interface OktaPolicy extends OktaResource {
  id: string;
  type: string;
  name: string;
  system: boolean;
  description: string;
  priority: number;
  status: string;
  settings: any;
  created: string;
  lastUpdated: string;
  _links?: any;
}

export enum OktaPolicyType {
  OKTA_SIGN_ON = 'OKTA_SIGN_ON',
  PASSWORD = 'PASSWORD',
  MFA_ENROLL = 'MFA_ENROLL',
  IDP_DISCOVERY = 'IDP_DISCOVERY',
  ACCESS_POLICY = 'ACCESS_POLICY',
  PROFILE_ENROLLMENT = 'PROFILE_ENROLLMENT',
}

export enum OktaPolicyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
