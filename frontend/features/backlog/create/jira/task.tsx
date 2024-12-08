"use client";
import {JiraTask} from "@/models/atlassian";
import TaskCheckBox from "./task-checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Dispatch, SetStateAction, useState} from "react";
import {PriorizationMethod} from "@/models/backlog";
import PriorizationSelect from "@/components/priorization-select";
import {Button} from "@/components/ui/button";

interface TaskFormProps {
  tasks: JiraTask[];
  setTasks: Dispatch<SetStateAction<JiraTask[]>>;
  submit: Function;
  method: PriorizationMethod | undefined;
}
export default function TaskForm({
  tasks,
  method,
  setTasks,
  submit,
}: TaskFormProps) {
  return (
    <div className="w-full">
      {tasks.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Summary</TableHead>
              {method !== "AI" && <TableHead>Priorization param</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task: JiraTask) => (
              <TableRow className="relative">
                <TableCell>{task.key}</TableCell>
                <TableCell>{task.fields.summary}</TableCell>
                {method !== "AI" && (
                  <TableCell>
                    <PriorizationSelect
                      task={task}
                      setTasks={setTasks}
                      priorizationMethod={method}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>
          No tasks were found in this backlog. Please add your tasks on your
          Jira project or add them manually.
        </p>
      )}
      <div className="flex justify-end py-4">
        <Button onClick={() => submit()}>Criar</Button>
      </div>
    </div>
  );
}
