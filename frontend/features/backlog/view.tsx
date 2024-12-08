"use client";

import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Loading from "@/components/loading";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Backlog} from "@/models/backlog";
import {NotificationContext} from "@/providers/notification";
import {getBackLogs} from "@/services/backlog/get_backlogs";
import {parseMethods} from "@/utils/parse_methods";
import { AuthContext } from "@/providers/auth";

export default function BackLogView() {
  const [backLogs, setBackLogs] = useState<Backlog[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const {sendNotification} = useContext(NotificationContext);
  const {user} = useContext(AuthContext);

  const fetchBackLogs = async () => {
    try {
      setIsLoading(true);
      const backlogsFromAPI = await getBackLogs(user!.email);
      console.log("teste", backlogsFromAPI)
      setBackLogs(backlogsFromAPI);
      sendNotification({
        message: "Backlogs loaded",
        title: "Success",
      });
    } catch (error) {
      sendNotification({
        message: "Error on fetching your backlogs",
        title: "Error",
        isDanger: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBackLogs();
  }, [user]);

  return (
    <Loading isLoading={isLoading}>
      <div className="self-end pb-6">
        <Button onClick={() => router.push("/backlogs/create")}>
          New Backlog
        </Button>
      </div>
      <div className="mx-auto bg-white rounded-md w-full p-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Backlog</TableHead>
              <TableHead>Priorization with</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {backLogs?.length ? (
              backLogs?.map((backlog) => (
                <TableRow key={backlog.id}>
                  <TableCell>
                    <Link href={`/backlogs/${backlog.id}`}>{backlog.name}</Link>
                  </TableCell>
                  <TableCell>
                    {parseMethods(backlog.priorization_method)}
                  </TableCell>
                  <TableCell>
                    {new Date(backlog.created_at!).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No Backlogs found
                </TableCell>
              </TableRow>
            )}
            {}
          </TableBody>
        </Table>
      </div>
    </Loading>
  );
}
