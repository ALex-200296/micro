import { Rules } from '../rules.class';

export const ProjectsRulesKey = {
  design: 'design',
  projectsRequest: 'projectsRequest',
  projectsSubmitted: 'projectsSubmitted',
} as const;

export const projectsRules = Rules.createSliceRule({
  [ProjectsRulesKey.design]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.prosmpr || rights?.prosmresh),
    },
  },
  [ProjectsRulesKey.projectsRequest]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.prosmresh),
    },
  },
  [ProjectsRulesKey.projectsSubmitted]: {
    accessRoute: {
      rights: ({ user: { rights } }) => Boolean(rights?.prosmpr),
    },
  },
});
