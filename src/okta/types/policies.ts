import { OktaResource } from '.';

export interface OktaPolicy extends OktaResource {
  id: string;
  type: string;
  name: string;
  system: boolean;
  description: string;
  priortiy: number;
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
  ACCESS_POLICY = 'ACCESS_POLICY',
  IDP_DISCOVERY = 'IDP_DISCOVERY',
  PROFILE_ENROLLMENT = 'PROFILE_ENROLLMENT',
}

export enum OktaPolicyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
