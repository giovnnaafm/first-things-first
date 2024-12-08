export type PriorizationMethod = "MoSCoW" | "Kano" | "Rice" | "AI";
export interface Backlog {
  id?: string;
  name: string;
  priorization_method: PriorizationMethod;
  user_id: string;
  jira?: boolean;
  created_at?: string;
}
