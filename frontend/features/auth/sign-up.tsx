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
import {NotificationContext} from "@/providers/notification";
import {User} from "@/models/user";
import {createUser} from "@/services/user/create_user";
import bcrypt from "bcryptjs";
import {ArrowLeft} from "lucide-react";

type FormData = {
  name: string;
  email: string;
  password_hash: string;
  confirm_password_hash: string;
};

export function SignUp() {
  const router = useRouter();
  const {sendNotification} = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = zod
    .object({
      name: zod.string().min(2, {
        message: "Provide a valid name.",
      }),
      email: zod.string().email({
        message: "Provide a valid e-mail.",
      }),
      password_hash: zod.string().min(4, {
        message: "Password must have at least 4 letters.",
      }),
      confirm_password_hash: zod.string().min(4, {
        message: "Confirm Password must have at least 4 letters.",
      }),
    })
    .refine((data) => data.password_hash === data.confirm_password_hash, {
      message: "Passwords don't match",
      path: ["confirm_password_hash"],
    });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password_hash: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      setIsLoading(true);
      const hashedPassword = await bcrypt.hash(data.password_hash, 10);
      const user: User = {
        email: data.email,
        name: data.name,
        password_hash: hashedPassword,
      };
      await createUser(user);
      sendNotification({
        title: "Created!",
        message: `User ${user.name} is ready to login`,
      });
      router.replace("/sign-in");
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
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="your name"
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
          name="email"
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
          name="password_hash"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  type="password"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password_hash"
          render={({field}) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm password"
                  {...field}
                  type="password"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between space-x-4 w-full">
          <Button
            onClick={() => router.push("/sign-in")}
            type="button"
            variant="outline"
            disabled={isLoading}
          >
            Log in
          </Button>
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
