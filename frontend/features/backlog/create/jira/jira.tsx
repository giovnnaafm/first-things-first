"use client";
import {User} from "@/models/user";
import {useState} from "react";
import BacklogForm from "./backlog";
import {FaJira} from "react-icons/fa";
import {redirectToJiraAuth} from "@/utils/atlassian_auth";
import {JiraTask} from "@/models/atlassian";
import TaskForm from "./task";
import {Backlog} from "@/models/backlog";
import {createBacklog} from "@/services/backlog/create_backlog";
import {createTask} from "@/services/task/create_task";
import {Task} from "@/models/task";
import {mapJiraPriorityToImpact} from "@/utils/parse_impact";
import { useRouter } from "next/navigation";

interface JiraFormProps {
  user: User | undefined;
}

export default function JiraForm({user}: JiraFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<"backlog" | "task">("backlog");
  const [backlogsTasks, setBacklogsTasks] = useState<JiraTask[]>([]);
  const [backlog, setBacklog] = useState<Backlog>();
  const router = useRouter()

  const submitBacklog = async () => {
    try {
      setIsLoading(true)
      if (!backlog) throw new Error("");
      const createdBacklog = await createBacklog(backlog);
      if (!createdBacklog.id) throw new Error("");
      for (let i: number = 0; i < backlogsTasks.length; i++) {
        const task: Task = {
          backlog_id: createdBacklog.id,
          title: backlogsTasks[i].fields.summary,
          moscow: backlogsTasks[i].priorization_details?.moscow
            ? backlogsTasks[i].priorization_details?.moscow
            : "Must Have",
          kano: backlogsTasks[i].priorization_details?.kano
            ? backlogsTasks[i].priorization_details?.kano
            : "Attractive",
          reach: parseInt(
            `${backlogsTasks[i].priorization_details?.rice?.reach}`
          ),
          confidence: parseInt(
            `${backlogsTasks[i].priorization_details?.rice?.confidence}`
          ),
          impact: mapJiraPriorityToImpact(
            backlogsTasks[i].fields.priority.name
          ),
          description: extractDescriptionText(backlogsTasks[i].fields.description?.content || [])
        };
        await createTask(task);
      }
      router.push("/backlogs")
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  const extractDescriptionText = (contentArray: any[]): string => {
    return contentArray
      .map((item) => {
        if (item.content) {
          return extractDescriptionText(item.content);
        }
        return item.text || '';
      })
      .join(' ');
  };

  const stepHandler = (): JSX.Element => {
    switch (step) {
      case "task":
        return (
          <TaskForm
            submit={submitBacklog}
            tasks={backlogsTasks}
            setTasks={setBacklogsTasks}
            method={backlog?.priorization_method}
          />
        );
      default:
        return (
          <BacklogForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setStep={setStep}
            setBacklogsTasks={setBacklogsTasks}
            setBacklogToSave={setBacklog}
          />
        );
    }
  };

  return (
    <div className="drop-shadow-lg p-4 bg-white  rounded-md flex justify-center">
      {!user?.atlassian_access_token ? (
        <button
          onClick={() => redirectToJiraAuth(user?.email)}
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors duration-200"
        >
          <FaJira className="mr-2" size={24} />
          Integrate with Jira
        </button>
      ) : (
        stepHandler()
      )}
    </div>
  );
}
