import { OktaUser } from '../okta/types';
import {
  OktaIntegrationConfig,
  StandardizedOktaFactor,
  StandardizedOktaUser,
} from '../types';
import { createUserEntity, createUserMfaDeviceRelationship } from './user';

const config: OktaIntegrationConfig = {
  oktaApiKey: '',
  oktaOrgUrl: '',
};

describe('creating user entity', () => {
  test('with received all optional data', () => {
    const user: OktaUser = {
      id: 'id',
      status: 'status',
      created: '2019-04-22T21:43:53.000Z',
      activated: '2019-04-22T21:43:53.000Z',
      statusChanged: '2019-04-22T21:43:53.000Z',
      lastLogin: '2019-04-22T21:43:53.000Z',
      lastUpdated: '2019-04-22T21:43:53.000Z',
      passwordChanged: '2019-04-22T21:43:53.000Z',
      _links: {},
      profile: {
        firstName: 'firstName',
        lastName: 'lastName',
        displayName: 'displayName',
        mobilePhone: 'mobilePhone',
        secondEmail: 'secondEmail',
        login: 'login',
        tenant: ['tenant'],
        email: 'email',
        userType: 'userType',
        employeeType: 'employeeType',
        employeeNumber: 'employeeNumber',
        manager: 'manager',
        managerId: 'managerId',
        generic: true,
        bitbucketUsername: 'bitbucketUsername',
        githubUsername: 'githubUsername',
      },
      credentials: {
        password: 'password',
        recovery_question: {
          question: 'question',
        },
        integration: {
          name: 'name',
          type: 'type',
        },
        emails: [
          {
            status: 'VERIFIED',
            type: 'type',
            value: 'value',
          },
          {
            status: 'UNVERIFIED',
            type: 'type',
            value: 'value',
          },
        ],
      },
    };
    expect(createUserEntity(config, user)).toEqual({
      _class: ['User'],
      _key: 'id',
      _rawData: [],
      _type: 'okta_user',
      activated: 1555969433000,
      activatedOn: 1555969433000,
      active: false,
      bitbucketUsername: 'bitbucketUsername',
      created: 1555969433000,
      createdOn: 1555969433000,
      displayName: 'login',
      email: 'email',
      employeeType: 'employeeType',
      employeeNumber: 'employeeNumber',
      firstName: 'firstName',
      generic: true,
      githubUsername: 'githubUsername',
      id: 'id',
      lastLogin: 1555969433000,
      lastLoginOn: 1555969433000,
      lastName: 'lastName',
      lastUpdated: 1555969433000,
      lastUpdatedOn: 1555969433000,
      login: 'login',
      manager: 'manager',
      managerId: 'managerId',
      mobilePhone: 'mobilePhone',
      name: 'firstName lastName',
      passwordChanged: 1555969433000,
      passwordChangedOn: 1555969433000,
      secondEmail: 'secondEmail',
      status: 'status',
      statusChanged: 1555969433000,
      statusChangedOn: 1555969433000,
      tenant: ['tenant'],
      unverifiedEmails: ['value'],
      userType: 'userType',
      username: 'login',
      verifiedEmails: ['value'],
      webLink: '/admin/user/profile/view/id',
    });
  });

  test('with not received all optional data', () => {
    const user: OktaUser = {
      id: 'id',
      status: 'status',
      created: '2019-04-22T21:43:53.000Z',
      activated: '2019-04-22T21:43:53.000Z',
      lastUpdated: '2019-04-22T21:43:53.000Z',
      profile: {
        firstName: 'firstName',
        lastName: 'lastName',
        displayName: 'displayName',
        mobilePhone: 'mobilePhone',
        secondEmail: 'secondEmail',
        login: 'login',
        tenant: ['tenant'],
        email: 'email',
        userType: 'userType',
        employeeType: 'employeeType',
        employeeNumber: 'employeeNumber',
        manager: 'manager',
        managerId: 'managerId',
        generic: true,
        bitbucketUsername: 'bitbucketUsername',
        githubUsername: 'githubUsername',
      },
    };
    expect(createUserEntity(config, user)).toEqual({
      _class: ['User'],
      _key: 'id',
      _rawData: [],
      _type: 'okta_user',
      activated: 1555969433000,
      activatedOn: 1555969433000,
      active: false,
      bitbucketUsername: 'bitbucketUsername',
      created: 1555969433000,
      createdOn: 1555969433000,
      displayName: 'login',
      email: 'email',
      employeeType: 'employeeType',
      employeeNumber: 'employeeNumber',
      firstName: 'firstName',
      generic: true,
      githubUsername: 'githubUsername',
      id: 'id',
      lastName: 'lastName',
      lastUpdated: 1555969433000,
      lastUpdatedOn: 1555969433000,
      login: 'login',
      manager: 'manager',
      managerId: 'managerId',
      mobilePhone: 'mobilePhone',
      name: 'firstName lastName',
      secondEmail: 'secondEmail',
      status: 'status',
      tenant: ['tenant'],
      userType: 'userType',
      username: 'login',
      webLink: '/admin/user/profile/view/id',
    });
  });

  describe('creating user -> mfaDevice relationship', () => {
    test('with all data', () => {
      const user: StandardizedOktaUser = {
        _class: 'User',
        _key: 'id',
        _rawData: [],
        _type: 'okta_user',
        activated: 1555969433000,
        activatedOn: 1555969433000,
        active: false,
        bitbucketUsername: 'bitbucketUsername',
        created: 1555969433000,
        createdOn: 1555969433000,
        displayName: 'login',
        email: 'email',
        employeeType: 'employeeType',
        firstName: 'firstName',
        generic: true,
        githubUsername: 'githubUsername',
        id: 'id',
        lastLogin: 1555969433000,
        lastLoginOn: 1555969433000,
        lastName: 'lastName',
        lastUpdated: 1555969433000,
        lastUpdatedOn: 1555969433000,
        login: 'login',
        manager: 'manager',
        managerId: 'managerId',
        mobilePhone: 'mobilePhone',
        name: 'firstName lastName',
        passwordChanged: 1555969433000,
        passwordChangedOn: 1555969433000,
        secondEmail: 'secondEmail',
        status: 'status',
        statusChanged: 1555969433000,
        statusChangedOn: 1555969433000,
        tenant: ['tenant'],
        unverifiedEmails: ['value'],
        userType: 'userType',
        username: 'login',
        verifiedEmails: ['value'],
        webLink: '/admin/user/profile/view/id',
      };
      const device: StandardizedOktaFactor = {
        _key: '_key',
        _type: '_type',
        _class: '_class',
        active: true,
        id: 'id',
        factorType: 'factorType',
        provider: 'provider',
        vendorName: 'vendorName',
        device: 'device',
        deviceType: 'deviceType',
        status: 'status',
        created: 'created',
        lastUpdated: 'lastUpdated',
      };
      expect(createUserMfaDeviceRelationship(user, device)).toEqual({
        _class: 'ASSIGNED',
        _fromEntityKey: 'id',
        _key: 'id|assigned|_key',
        _toEntityKey: '_key',
        _type: 'okta_user_assigned_factor',
        displayName: 'ASSIGNED',
        factorId: 'id',
        userId: 'id',
      });
    });
  });
});
