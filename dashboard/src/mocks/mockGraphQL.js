export const mockGraphQLResponse = {
  data: {
    viewer: {
      login: "mocktester",
      name: "Mock Tester",
      avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4"
    },
    repo: {
      stargazerCount: 42,
      forkCount: 7,
      openIssues: { totalCount: 3 },
      openPRs: { totalCount: 1 },
      updatedAt: "2025-01-20T12:22:10Z",
      diskUsage: 1520, 
      defaultBranchRef: {
        target: {
          history: { totalCount: 15 } 
        }
      }
    }
  }
};
