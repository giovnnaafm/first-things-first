"use client";

import React, {useContext, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {signIn} from "@/security/sign_in";
import {NotificationContext} from "@/providers/notification";
import bcrypt from "bcryptjs";
import {getUser} from "@/services/user/get_user";

type FormData = {
  username: string;
  password: string;
};

export function SignIn() {
  const router = useRouter();
  const {sendNotification} = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = zod.object({
    username: zod.string().email({
      message: "field must be a valid email",
    }),
    password: zod.string().min(4, {
      message: "Password must have at least 4 letters",
    }),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
  };

  const onSubmit = async (values: FormData): Promise<void> => {
    try {
      setIsLoading(true);
      const {username, password} = values;
      const user = await getUser(username);
      if (!user) {
        throw new Error("User not found");
      }
      const passwordMatch = await comparePassword(password, user.password_hash);
      if (!passwordMatch) {
        throw new Error("Invalid password");
      }
      const {name} = await signIn(username, password);
      sendNotification({
        title: "Logged!",
        message: `User ${name} authenticated!`,
      });
      router.replace("/");
    } catch (error: Error | any) {
      sendNotification({
        isDanger: true,
        title: "Error",
        message: "Verify your inputs and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 select-none bg-white rounded-md p-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="your e-mail"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  type="password"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 space-x-4">
          <Button
            onClick={() => router.push("/sign-up")}
            type="button"
            variant="outline"
            disabled={isLoading}
          >
            Create account
          </Button>
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
