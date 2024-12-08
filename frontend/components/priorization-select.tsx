import {PriorizationMethod} from "@/models/backlog";

import {Input} from "./ui/input";
import {RadioGroup, RadioGroupItem} from "./ui/radio-group";
import {Label} from "./ui/label";
import {JiraTask} from "@/models/atlassian";

interface PriorizationSelectProps {
  priorizationMethod: PriorizationMethod | undefined;
  setTasks: any;
  task: JiraTask;
}
export default function PriorizationSelect({
  priorizationMethod,
  setTasks,
  task,
}: PriorizationSelectProps) {
  const handleRadioChange = (value: string) => {
    setTasks((prevTasks: JiraTask[]) =>
      prevTasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              priorization_details: {
                ...t.priorization_details,
                [priorizationMethod?.toLowerCase()!]: value,
              },
            }
          : t
      )
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setTasks((prevTasks: JiraTask[]) =>
      prevTasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              priorization_details: {
                ...t.priorization_details,
                rice: {
                  ...t.priorization_details?.rice,
                  [field]: e.target.value,
                },
              },
            }
          : t
      )
    );
  };

  const sortMethod = (): JSX.Element => {
    switch (priorizationMethod) {
      case "MoSCoW":
        return (
          <RadioGroup
            onValueChange={handleRadioChange}
            className="grid grid-cols-2"
            defaultValue="Must Have"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Must Have" id="Must Have" />
              <Label htmlFor="Must Have">Must Have</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Should Have" id="Should Have" />
              <Label htmlFor="Should Have">Should Have</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Could Have" id="Could Have" />
              <Label htmlFor="Could Have">Could Have</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Wont Have" id="Wont Have" />
              <Label htmlFor="Wont Have">Won't Have</Label>
            </div>
          </RadioGroup>
        );
      case "Kano":
        return (
          <RadioGroup
            onValueChange={handleRadioChange}
            className="grid grid-cols-2"
            defaultValue="Attractive"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Must-Be" id="Must-Be" />
              <Label htmlFor="Must-Be">Must-be</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="One-Dimensional" id="One-Dimensional" />
              <Label htmlFor="One-Dimensional">One-Dimensional</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="attractive" id="attractive" />
              <Label htmlFor="attractive">Attractive</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Indifferent" id="Indifferent" />
              <Label htmlFor="Indifferent">Indifferent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Reverse" id="Reverse" />
              <Label htmlFor="Reverse">Reverse</Label>
            </div>
          </RadioGroup>
        );
      case "Rice":
        return (
          <div className="grid gap-2 grid-cols-2">
            <Input
              placeholder="reach"
              onChange={(e) => handleInputChange(e, "reach")}
            />
            <Input
              placeholder="confidence"
              onChange={(e) => handleInputChange(e, "confidence")}
            />
          </div>
        );
      default:
        return <div></div>;
    }
  };

  return sortMethod();
}
