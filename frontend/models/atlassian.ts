import { MoSCoW, KanoCategory, Rice } from "./methods";

export interface JiraBacklog {
  id: string;
  name: string;
}

export interface JiraTask {
  id: string;
  key: string;
  priorization_details?: {
    moscow?: MoSCoW;
    kano?: KanoCategory;
    rice?: Rice;
  };
  fields: {
    summary: string;
    statuscategorychangedate: string;
    issuetype: {
      id: string;
      description: string;
      name: string;
      subtask: boolean;
      hierarchyLevel: number;
    };
    timespent: number | null;
    description?: TaskDescription;
    fixVersions: any[];
    aggregatetimespent: number | null;
    resolution: string | null;
    workratio: number;
    watches: {
      watchCount: number;
      isWatching: boolean;
    };
    lastViewed: string;
    created: string;
    priority: {
      name: string;
      id: string;
    };
    labels: string[];
    timeestimate: number | null;
    aggregatetimeoriginalestimate: number | null;
    versions: any[];
    issuelinks: any[];
    assignee: string | null;
    updated: string;
    status: {
      id: string;
      name: string;
      description: string;
    };
  };
}

export interface TaskDescription {
        type: string;
        version: number;
        content: Array<{
          type: string;
          content: Array<{
            type: string;
            text: string;
          }>;
        }>;
}