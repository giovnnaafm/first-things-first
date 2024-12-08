"use client";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {JiraBacklog, JiraTask} from "@/models/atlassian";
import { PriorizationMethod } from "@/models/backlog";
import {NotificationContext} from "@/providers/notification";
import {getJiraBacklogs} from "@/services/backlog/get_jira_backlogs";
import {getJiraBacklogsTasks} from "@/services/backlog/get_jira_backlogs_tasks";
import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {AuthContext} from "@/providers/auth";
import * as zod from "zod";

import {zodResolver} from "@hookform/resolvers/zod";

interface BacklogFormProps {
  isLoading: boolean;
  setIsLoading: (loading:boolean) => void;
  setStep: (step:"task"|"backlog") => void;
  setBacklogsTasks: Dispatch<SetStateAction<JiraTask[]>>;
  setBacklogToSave: Function;
}

type FormData = {
  id: string;
  name: string;
  jira: boolean;
};
export default function BacklogForm({
  isLoading,
  setIsLoading,
  setStep,
  setBacklogsTasks,
  setBacklogToSave,
}: BacklogFormProps) {
  const {user} = useContext(AuthContext);
  const [backlogs, setBacklogs] = useState<JiraBacklog[]>();

  const {sendNotification} = useContext(NotificationContext);

  const formSchema = zod.object({
    id: zod.string().min(1, {
      message: "Choose backlog",
    }),
    name: zod.string().min(2, {
      message: "Name your backlog",
    })
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      id: "",
    },
  });

  const getBacklogsFromJira = async () => {
    try {
      setIsLoading(true);
      if (!user?.email) return;
      const jiraBacklogs = await getJiraBacklogs(user.email);
      setBacklogs(jiraBacklogs);
    } catch (error) {
      sendNotification({
        title: "Error!",
        message: "Could not get your Jira projects",
        isDanger: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.atlassian_access_token) return;
    getBacklogsFromJira();
  }, [user?.atlassian_access_token]);

  const getTasksFromJiraBacklog = async (data: FormData) => {
    try {
      setBacklogsTasks([]);
      setIsLoading(true);
      if (!user?.email) return;
      const tasks: JiraTask[] = await getJiraBacklogsTasks(data.id, user.email);
      setBacklogsTasks(tasks);
      setStep("task");
      setBacklogToSave({
        name: data.name,
        priorization_method: "AI",
        jira: true,
        user_id: user.email,
      });
    } catch (error) {
      sendNotification({
        title: "Error!",
        message: "Could not get your Jira Project tasks",
        isDanger: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => getTasksFromJiraBacklog(data))}
        className="w-full grid grid-cols-4 gap-3"
      >
        <FormField
          name="name"
          control={form.control}
          render={({field}) => (
            <FormItem className="col-span-4">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="Backlog's name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({field}) => (
            <FormItem className="col-span-4">
              <FormLabel>Jira Backlog</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value: string) => form.setValue("id", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {backlogs?.length
                      ? backlogs?.map((value: JiraBacklog) => (
                          <SelectItem value={value.id}>{value.name}</SelectItem>
                        ))
                      : null}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <p className="text-sm italic text-secondary col-span-4">*All Backlogs imported from Jira will be prioritized with AI</p>
        <div className="w-full col-span-4 flex justify-end">
          <Button>Search backlog tasks</Button>
        </div>
      </form>
    </Form>
  );
}
