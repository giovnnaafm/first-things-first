"use client";

import {useForm} from "react-hook-form";
import * as zod from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {Backlog} from "@/models/backlog";
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
import {createBacklog} from "@/services/backlog/create_backlog";
import {NotificationContext} from "@/providers/notification";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {AuthContext} from "@/providers/auth";
import JiraForm from "./jira/jira";
import {getUser} from "@/services/user/get_user";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";

export default function CreateBacklog() {
  const {sendNotification} = useContext(NotificationContext);
  const {user, setAuthUser} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()

  const updateJiraAuth = async () => {
    try {
      setIsLoading(true);
      if (!user?.email) return;
      const newUser = await getUser(user.email);
      setAuthUser(newUser);
    } catch (error) {
      sendNotification({
        message: "Error on Jira integration.",
        title: "Error!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateJiraAuth();
  }, []);

  const formSchema = zod.object({
    name: zod.string().min(2, {
      message: "Name your backlog",
    }),
    priorization_method: zod.string().min(2, {
      message: "Choose the priorization method",
    }),
  });

  const form = useForm<Backlog>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      user_id: user?.email,
      priorization_method: undefined,
    },
  });

  const createBackLogService = async () => {
    try {
      setIsLoading(true);
      const values = form.getValues();
      if(!user || !user.email) throw new Error
      values.user_id = user?.email
      await createBacklog(values);
      sendNotification({
        message: "Backlog created with success",
        title: "Created!",
      });
      router.push("/backlogs")
    } catch (error) {
      sendNotification({
        message: "Could not create the backlog",
        title: "Error!",
        isDanger: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="manual" >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="manual">Manual</TabsTrigger>
        <TabsTrigger value="jira">Import from Jira</TabsTrigger>
      </TabsList>
      <TabsContent value="manual">
        <Loading isLoading={isLoading}>
          <div className="drop-shadow-lg p-4 bg-white rounded-md">
            <Form {...form}>
              <form
                className="grid grid-cols-3 gap-3"
                onSubmit={form.handleSubmit(createBackLogService)}
              >
                <FormField
                  name="name"
                  control={form.control}
                  render={({field}) => (
                    <FormItem className="col-span-3">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name of backlog"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="priorization_method"
                  control={form.control}
                  render={({field}) => (
                    <FormItem className="col-span-3">
                      <FormLabel>Priorization method</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value: any) =>
                            form.setValue("priorization_method", value)
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="w-full">
                            <SelectItem value="MoSCoW">MoSCoW</SelectItem>
                            <SelectItem value="Kano">Kano Model</SelectItem>
                            <SelectItem value="Rice">Rice</SelectItem>
                            <SelectItem value="AI">AI</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full col-span-3 flex justify-end">
                  <Button>Create backlog</Button>
                </div>
              </form>
            </Form>
          </div>
        </Loading>
      </TabsContent>
      <TabsContent value="jira">
        <JiraForm
          user={user}
        />
      </TabsContent>
    </Tabs>
  );
}
