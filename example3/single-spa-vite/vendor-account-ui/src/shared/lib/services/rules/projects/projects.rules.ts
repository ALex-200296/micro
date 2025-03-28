import { Rules } from '../rules.class';

export const ProjectsRulesKey = {
  DESIGN: 'design',
  PROJECTS_REQUEST: 'projectsRequest',
  PROJECTS_SUBMITTED: 'projectsSubmitted',
} as const;

export const projectsRules = Rules.createSliceRule({
  [ProjectsRulesKey.DESIGN]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.prosmpr || rights?.prosmresh),
    },
  },
  [ProjectsRulesKey.PROJECTS_REQUEST]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.prosmresh),
    },
  },
  [ProjectsRulesKey.PROJECTS_SUBMITTED]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.prosmpr),
    },
  },
});
