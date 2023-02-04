import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  getRawData,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../client';
import { IntegrationConfig } from '../config';
import {
  createPolicyEntity,
  createAccountPolicyRelationship,
  createApplicationPolicyRelationship,
} from '../converters/policy';
import { StandardizedOktaPolicy, StandardizedOktaAccount } from '../types';
import {
  DATA_ACCOUNT_ENTITY,
  Entities,
  Relationships,
  Steps,
} from './constants';
import { OktaPolicyType } from '../okta/types/policies';
import { OktaApplication } from '../okta/types';

export async function fetchPolicies({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config, logger);

  const accountEntity = (await jobState.getData(
    DATA_ACCOUNT_ENTITY,
  )) as StandardizedOktaAccount;

  //iterate by policy type
  const policyTypes = Object.values(OktaPolicyType);
  for (const policyType of policyTypes) {
    await apiClient.iteratePolicies(policyType, async (policy) => {
      const policyEntity = (await jobState.addEntity(
        createPolicyEntity(policy),
      )) as StandardizedOktaPolicy;

      await jobState.addRelationship(
        createAccountPolicyRelationship(accountEntity, policyEntity),
      );
    });
  }
}

export async function buildApplicationPolicyRelationships({
  jobState,
  logger,
}): Promise<void> {
  await jobState.iterateEntities(
    { _type: Entities.APPLICATION._type },
    async (applicationEntity) => {
      const application = getRawData<OktaApplication>(applicationEntity);
      if (!application) {
        logger.error(
          `Can not get raw data from application entity: ${applicationEntity._key}`,
        );
      }

      if (application) {
        if (applicationEntity.accessPolicy) {
          const accessPolicyEntity = await jobState.findEntity(
            applicationEntity.accessPolicy,
          );
          await jobState.addRelationship(
            createApplicationPolicyRelationship(
              applicationEntity,
              accessPolicyEntity,
            ),
          );
        }

        if (applicationEntity.profileEnrollment) {
          const profileEnrollmentEntity = await jobState.findEntity(
            applicationEntity.profileEnrollment,
          );
          await jobState.addRelationship(
            createApplicationPolicyRelationship(
              applicationEntity,
              profileEnrollmentEntity,
            ),
          );
        }
      }
    },
  );
}

export const policySteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.POLICIES,
    name: 'Fetch Policies',
    entities: [Entities.POLICY],
    relationships: [Relationships.ACCOUNT_HAS_POLICY],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchPolicies,
  },
  {
    id: Steps.APPLICATION_POLICY_RELATIONSHIP,
    name: 'Build Application Policy Relationships',
    entities: [],
    relationships: [Relationships.APPLICATION_ASSIGNED_POLICY],
    dependsOn: [Steps.APPLICATIONS, Steps.POLICIES],
    executionHandler: buildApplicationPolicyRelationships,
  },
];
