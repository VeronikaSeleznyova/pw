export const MOCKED_ENDPOINTS = {
  account: {
    path: 'https://api.accounts.stage.osts-apps.com/account',
    response: {
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [{ name: 'Main Acc', accountId: 1 }] }),
    },
  },
  user: {
    path: 'https://api.accounts.stage.osts-apps.com/user/users',
    response: {
      body: JSON.stringify({
        data: [{ userId: 'userId-1', userEmail: 'test.user1@test.test' }],
      }),
    },
  },  
  users: {
    path: 'https://api.accounts.stage.osts-apps.com/user/invite/users',
    response: {
      body: JSON.stringify({
        data: [{ userEmail: 'another@test.eu' }, { userEmail: 'test@test.cc' }],
      }),
    },
  },
  group: {
    path: 'https://api.accounts.stage.osts-apps.com/group',
    response: {
      body: JSON.stringify({
        data: [
          {
            name: 'ACCT_admins',
            groupId: 'groupId-1',
          },
          {
            name: 'ACCT_users',
            groupId: 'groupId-2',
          },
          {
            name: 'LEGACY_operations',
            groupId: 'groupId-3',
          },
          {
            name: 'LEGACY_developer',
            groupId: 'groupId-4',
          },
          {
            name: 'LEGACY_limited',
            groupId: 'groupId-5',
          },
          {
            name: 'LEGACY_cloudid',
            groupId: 'groupId-6',
          },
        ],
      }),
    },
  },
};

export const getUserGroups = (id: string, newUser?: Object) => ({
  path: `https://api.accounts.stage.osts-apps.com/group/${id}/users`,
  response: {
    body: JSON.stringify({
      data: [
        {
          userId: 'userId-1',
          status: 'member',
          userEmail: 'test.user1@test.test',
        },
        {
          userEmail: 'test@test.cc',
          status: 'pending',
        },
        {
          userEmail: 'another@test.eu',
          status: 'pending',
        },
        ...(newUser ? [newUser] : []),
      ],
    }),
  },
});
