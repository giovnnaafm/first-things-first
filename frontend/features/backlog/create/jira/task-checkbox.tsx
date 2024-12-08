"use client";
import PriorizationSelect from "@/components/priorization-select";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {TableCell, TableRow} from "@/components/ui/table";
import {JiraTask, TaskDescription} from "@/models/atlassian";
import {PriorizationMethod} from "@/models/backlog";
import {useState} from "react";

interface JiraTaskCardProps {
  task: JiraTask;
  tasksToSubmit: JiraTask[];
  setTasksToSubmit: Function;
  method: PriorizationMethod | undefined;
}
export default function TaskCheckBox({
  task,
  tasksToSubmit,
  setTasksToSubmit,
  method,
}: JiraTaskCardProps) {
  const [checked, setChecked] = useState<boolean>(true);

  function handleTaskChange(value: boolean) {
    setChecked(value);

    if (!value) {
      setTasksToSubmit(tasksToSubmit.filter((t) => t.key !== task.key));
    } else {
      const updatedTasks = [...tasksToSubmit, task].sort((a, b) =>
        a.key.localeCompare(b.key)
      );
      setTasksToSubmit(updatedTasks);
    }
  }

  return (
    <TableRow className="relative">
      <TableCell>
        <Checkbox
          id={task.key}
          checked={checked}
          onCheckedChange={handleTaskChange}
        />
      </TableCell>
      <TableCell>{task.key}</TableCell>
      <TableCell>{task.fields.summary}</TableCell>
      <TableCell>
        {/*<PriorizationSelect priorizationMethod={method} />*/}
      </TableCell>
    </TableRow>
  );
}
