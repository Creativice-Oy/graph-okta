import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { OktaPolicy } from '../okta/types';
import { Entities, Relationships } from '../steps/constants';
import { StandardizedOktaPolicy, StandardizedOktaAccount } from '../types';

export function createPolicyEntity(data: OktaPolicy): Entity {
  if (data.type == 'PASSWORD') {
    return createIntegrationEntity({
      entityData: {
        source: data,
        assign: {
          _key: data.id,
          _type: Entities.POLICY._type,
          _class: 'Policy',
          displayName: data.name,
          title: data.name,
          summary: data.description || 'default',
          content: data.description || 'default',
          type: data.type || 'NULL',
          name: data.name,
          system: data.system,
          description: data.description,
          priortiy: data.priortiy,
          status: data.status,
          created: parseTimePropertyValue(data.created),
          lastUpdated: parseTimePropertyValue(data.lastUpdated),

          minLength: data.settings.password.complexity.minLength,
          minLowerCase: data.settings.password.complexity.minLowerCase,
          minUpperCase: data.settings.password.complexity.minUpperCase,
          minNumber: data.settings.password.complexity.minNumber,
          minSymbol: data.settings.password.complexity.minSymbol,
          excludeUsername: data.settings.password.complexity.excludeUsername,
          dictionary:
            data.settings.password.complexity.dictionary.common.exclude,
          excludeAttributes:
            data.settings.password.complexity.excludeAttributes,

          maxAgeDays: data.settings.password.age.maxAgeDays,
          expireWarnDays: data.settings.password.age.expireWarnDays,
          minAgeMinutes: data.settings.password.age.minAgeMinutes,
          historyCount: data.settings.password.age.historyCount,

          maxAttempts: data.settings.password.lockout.maxAttempts,
          autoUnlockMinutes: data.settings.password.lockout.autoUnlockMinutes,
          userLockoutNotificationChannels:
            data.settings.password.lockout.userLockoutNotificationChannels,
          showLockoutFailures:
            data.settings.password.lockout.showLockoutFailures,
        },
      },
    });
  }
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: data.id,
        _type: Entities.POLICY._type,
        _class: 'Policy',
        displayName: `${data.type}-${data.name}`,
        title: data.name,
        summary: data.description || 'default',
        content: data.description || 'default',
        type: data.type || 'NULL',
        name: data.name,
        system: data.system,
        description: data.description,
        priortiy: data.priortiy,
        status: data.status,
        created: parseTimePropertyValue(data.created),
        lastUpdated: parseTimePropertyValue(data.lastUpdated),
      },
    },
  });
}

export function createAccountPolicyRelationship(
  account: StandardizedOktaAccount,
  policy: StandardizedOktaPolicy,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: account,
    to: policy,
    properties: {
      _type: Relationships.ACCOUNT_HAS_POLICY._type,
      accountUrl: account.webLink,
    },
  });
}

export function createApplicationPolicyRelationship(
  application: Entity,
  policy: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.ASSIGNED,
    from: application,
    to: policy,
  });
}
