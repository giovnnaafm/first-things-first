"use client";

import Loading from "@/components/loading";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Backlog, PriorizationMethod} from "@/models/backlog";
import {Status, Task} from "@/models/task";
import {NotificationContext} from "@/providers/notification";
import {getAIPriorization} from "@/services/ai/get_ai_priorization";
import {getOneBackLog} from "@/services/backlog/get_backlogs";
import {getTasksFromBacklog} from "@/services/backlog/get_tasks_from_backlog";
import {SparkleIcon} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {Fragment, useContext, useEffect, useState} from "react";

interface CardItemProps {
  title: string;
  value: any;
}
function CardItem({title, value}: CardItemProps) {
  return (
    <div className="col-span-2 flex flex-col">
      <p className="font-bold text-gray-500">{title}</p>
      <p>{value}</p>
    </div>
  );
}

export default function TasksView() {
  const [backlogTasks, setBacklogTasks] = useState<Task[]>();
  const [priorizationWith, setPriorizationWith] = useState<PriorizationMethod>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [justificative, setJustificative] = useState<string>();
  const {sendNotification} = useContext(NotificationContext);

  const {id} = useParams();
  const router = useRouter();

  const fetchBacklogTasks = async (id: string) => {
    try {
      setIsLoading(true);
      const backlogFromAPI = await getOneBackLog(id);
      setPriorizationWith(backlogFromAPI.priorization_method);
      const backlogsTasksFromAPI = await getTasksFromBacklog(id);
      setBacklogTasks(backlogsTasksFromAPI);
    } catch (error) {
      sendNotification({
        message: "Error on fetching the backlog's tasks",
        title: "Error",
        isDanger: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBadgeVariant = (
    status: Status
  ):
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "warning"
    | undefined => {
    switch (status.toLowerCase()) {
      case "to do":
        return "outline";
      case "in Progress":
        return "secondary";
      case "completed":
        return "default";
      case "on hold":
        return "warning";
    }
  };

  const priorizationData = (task: Task) => {
    switch (priorizationWith) {
      case "Kano":
        return <CardItem title="Kano Model" value={task.kano} />;
      case "MoSCoW":
        return <CardItem title="MosCow" value={task.moscow} />;
      case "Rice":
        return (
          <Fragment>
            <CardItem title="Reach" value={task.reach} />
            <CardItem title="Confidence" value={task.confidence} />
          </Fragment>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchBacklogTasks(typeof id === "string" ? id : id[0]);
  }, []);

  const AIPriorizationHandler = async () => {
    try {
      setJustificative("");
      setIsLoading(true);
      if (!backlogTasks) return;
      const reorganizedTasks = await getAIPriorization(backlogTasks);
      setBacklogTasks(reorganizedTasks.tasks);
      setJustificative(reorganizedTasks.justification);
    } catch (error) {
      sendNotification({
        message: "Error on AI priorization",
        title: "Error",
        isDanger: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <div className="w-full flex flex-col">
        {priorizationWith === "AI" ? (
          <Button className="self-end mb-2" onClick={AIPriorizationHandler}>
            AI Priorization
          </Button>
        ) : null}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {backlogTasks?.map((task: Task, index: number) => (
            <Card className="relative p-4 grid drop-shadow-sm">
              <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-secondary flex justify-center items-center text-white border-2 border-primary">
                <p>#{index + 1}</p>
              </div>
              <p className="col-span-5 text-left font-bold text-primary max-h-fit">
                {task.title}
              </p>
              {task.status ? (
                <Badge
                  variant={getBadgeVariant(task?.status)}
                  className="justify-center whitespace-nowrap max-h-fit "
                >
                  {task.status}
                </Badge>
              ) : null}
              <p className="col-span-6 text-secondary py-2 overflow-x-auto max-h-fit">{task.description}</p>
              <CardItem title="Impact" value={task.impact} />
              {task.estimative ? (
                <CardItem title="Estimative" value={task.estimative} />
              ) : null}
              {task.due_time ? (
                <CardItem
                  title="Due time"
                  value={new Date(task.due_time).toLocaleDateString()}
                />
              ) : null}
              {priorizationData(task)}
            </Card>
          ))}
          <div className="w-full mx-auto self-center text-center lg:text-left">
            <Button
              onClick={() => {
                router.push(`/tasks/create/${id}`);
              }}
              className="w-20 h-20 rounded-full border-2 border-primary bg-secondary hover:bg-secondary/80 text-lg"
            >
              +
            </Button>
          </div>
        </div>
        {justificative?.length ? (
          <Card className="bg-primary/80 text-white p-4 my-4">
            <strong className="flex">
              <SparkleIcon className="mr-2" />
              AI Priorization:
            </strong>
            {justificative}
          </Card>
        ) : null}
      </div>
    </Loading>
  );
}
