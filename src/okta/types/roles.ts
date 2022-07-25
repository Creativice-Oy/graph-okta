import { OktaResource } from '.';

export interface OktaRole extends OktaResource {
  assignmentType: OktaRoleAssignmentType;
  created: string;
  description: string;
  id: string;
  label: string;
  lastUpdated?: string;
  status: OktaRoleStatus;
  type: string;
}

declare enum OktaRoleAssignmentType {
  GROUP = 'GROUP',
  USER = 'USER',
}

declare enum OktaRoleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
