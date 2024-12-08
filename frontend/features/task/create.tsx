"use client";

import {useForm} from "react-hook-form";
import * as zod from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useContext, useEffect, useState} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {NotificationContext} from "@/providers/notification";
import {Button} from "@/components/ui/button";
import {Impact, Status, Task} from "@/models/task";
import {createTask} from "@/services/task/create_task";
import {Textarea} from "@/components/ui/textarea";
import {useParams, useRouter} from "next/navigation";
import PriorizationField from "./priorization-field";
import {getOneBackLog} from "@/services/backlog/get_backlogs";
import {PriorizationMethod} from "@/models/backlog";

//TO DO mask estimative (*h,*d,*w)
export default function CreateTask() {
  const {sendNotification} = useContext(NotificationContext);
  const [priorizationWith, setPriorizationWith] =
    useState<PriorizationMethod>("AI");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {id} = useParams();
  const router = useRouter();

  const formSchema = zod.object({
    title: zod.string().min(2, {
      message: "title field is required",
    }),
  });

  const form = useForm<Task>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      backlog_id: "",
      impact: undefined,
      estimative: "",
      status: undefined,
      due_time: undefined,
      reach: 0,
      confidence: 0,
      moscow: undefined,
      kano: undefined,
    },
  });

  const createTaskHandler = async () => {
    try {
      setIsLoading(true);
      const values = form.getValues();
      if (!id) throw new Error("The task must be attached to a backlog");
      values.backlog_id = typeof id === "string" ? id : id[0];
      await createTask(values);
      sendNotification({
        message: "Task created",
        title: "Success!",
      });
      router.push(`/backlogs/${id}`);
    } catch (error) {
      sendNotification({
        message: "Could not create task",
        title: "Error!",
        isDanger: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBackLogData = async () => {
    try {
      setIsLoading(true);
      if (!id) throw new Error("");
      const backlog = await getOneBackLog(typeof id === "string" ? id : id[0]);
      setPriorizationWith(backlog.priorization_method);
    } catch (error) {
      sendNotification({
        message: "Could not find created backlog",
        title: "Error!",
        isDanger: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBackLogData()
  }, [])

  return (
    <div className="drop-shadow-lg p-4 bg-white rounded-md">
      <Form {...form}>
        <form
          className="grid lg:grid-cols-9 gap-3"
          onSubmit={form.handleSubmit(createTaskHandler)}
        >
          <FormField
            name="title"
            control={form.control}
            render={({field}) => (
              <FormItem className="lg:col-span-6">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="title of the task"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="due_time"
            control={form.control}
            render={({field}) => (
              <FormItem className="lg:col-span-3">
                <FormLabel>Due time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({field}) => (
              <FormItem className="lg:col-span-9">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    {...field}
                    placeholder="task description, comments, dificulties"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="estimative"
            control={form.control}
            render={({field}) => (
              <FormItem className="lg:col-span-2">
                <FormLabel>Estimative of work hours</FormLabel>
                <FormControl>
                  <Input placeholder="work hours estimative" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="status"
            control={form.control}
            render={({field}) => (
              <FormItem className="lg:col-span-2">
                <FormLabel>Impact</FormLabel>
                <Select
                  onValueChange={(value: Impact) =>
                    form.setValue("impact", value)
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="status"
            control={form.control}
            render={({field}) => (
              <FormItem className="lg:col-span-2">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={(value: Status) =>
                    form.setValue("status", value)
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <PriorizationField form={form} method={priorizationWith} />
          <div
            className="lg:col-span-9 place-self-end py-6"
          >
            <Button type="submit">Create task</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
