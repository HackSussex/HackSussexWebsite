// mocks/handlers.js
import { http, HttpResponse } from "msw";
import { mockEvents, mockCommittee, mockSponsors, mockSiteData, mockGallery } from "./mockData";
import { githubJSON } from "./githubResponse";
import { mockGraphQLResponse } from "./mockGraphQL";

export const handlers = [
  // Mock GitHub user
  http.get("https://api.github.com/user", () => {
    return HttpResponse.json({
      login: "mocktester",
      avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    });
  }),

  http.post("https://api.github.com/graphql", () => {
    return HttpResponse.json(mockGraphQLResponse);
  }),

  // Events.json
  http.get(
    /https:\/\/api\.github\.com\/repos\/.*\/contents\/src\/config\/events\.json/,
    () => HttpResponse.json(githubJSON(mockEvents))
  ),

  // Committee.json
  http.get(
    /https:\/\/api\.github\.com\/repos\/.*\/contents\/src\/config\/committee\.json/,
    () => HttpResponse.json(githubJSON(mockCommittee))
  ),

  http.get(
    /https:\/\/api\.github\.com\/repos\/.*\/contents\/src\/config\/gallery\.json/,
    () => HttpResponse.json(githubJSON(mockGallery))
  ),

  // Sponsors.json
  http.get(
    /https:\/\/api\.github\.com\/repos\/.*\/contents\/src\/config\/sponsors\.json/,
    () => HttpResponse.json(githubJSON(mockSponsors))
  ),

  // Site metadata
  http.get(
    /https:\/\/api\.github\.com\/repos\/.*\/contents\/src\/config\/siteData\.json/,
    () => HttpResponse.json(githubJSON(mockSiteData))
  ),

  http.get("/favicon.ico", () => HttpResponse.json(null, { status: 204 })),
];
