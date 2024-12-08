import {MoSCoW, KanoCategory, Rice} from "@/models/methods";

export type Status = "To do" | "In Progress" | "Completed" | "On Hold";

export type Impact = "High" | "Medium" | "Low";

export interface Task {
  id?: string;
  backlog_id: string;
  title: string;
  due_time?: string;
  impact: Impact;
  status?: Status;
  priority?: number;
  description?: string;
  estimative?: string;
  moscow?: MoSCoW;
  kano?: KanoCategory;
  reach: number;
  confidence: number;
}
