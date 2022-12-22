import {
  createIntegrationEntity,
  parseTimePropertyValue,
  Entity,
  Relationship,
  RelationshipClass,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';

import { OktaRule } from '../okta/types';
import { Entities, Relationships } from '../steps/constants';
import { StandardizedOktaFactor } from '../types';

export function createPolicyRuleEntity(policyRule: OktaRule): Entity {
  return createIntegrationEntity({
    entityData: {
      source: policyRule,
      assign: {
        _key: policyRule.id,
        _type: Entities.RULE._type,
        _class: Entities.RULE._class,
        id: policyRule.id,
        name: policyRule.name,
        ruleType: policyRule.type, //example: 'group_rule', 'policy_rule'
        status: policyRule.status.toLowerCase(), //example: 'ACTIVE' or 'INACTIVE'
        created: parseTimePropertyValue(policyRule.created)!,
        createdOn: parseTimePropertyValue(policyRule.created)!,
        lastUpdated: parseTimePropertyValue(policyRule.lastUpdated)!,
        lastUpdatedOn: parseTimePropertyValue(policyRule.lastUpdated)!,
        conditions: JSON.stringify(policyRule.conditions),
        actions: JSON.stringify(policyRule.actions),
      },
    },
  });
}

export function createPolicyRulePolicyRelationship(
  policyRule: Entity,
  policy: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.ASSIGNED,
    from: policyRule,
    to: policy,
    properties: {
      _type: Relationships.RULE_ASSIGNED_POLICY._type,
    },
  });
}
