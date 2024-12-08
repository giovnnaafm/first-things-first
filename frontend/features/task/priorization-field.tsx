import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {PriorizationMethod} from "@/models/backlog";
import {Task} from "@/models/task";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {Fragment, ReactNode} from "react";
import {UseFormReturn} from "react-hook-form";
import {Input} from "@/components/ui/input";

interface PriorizationFieldProps {
  method: PriorizationMethod;
  form: UseFormReturn<Task>;
}
export default function PriorizationField({
  method,
  form,
}: PriorizationFieldProps) {
  const selectField = (): ReactNode => {
    switch (method) {
      case "Kano":
        return (
          <FormField
            name="kano"
            control={form.control}
            render={({field}) => (
              <FormItem style={{gridColumn: "span 2 / span 2"}}>
                <FormLabel>Kano Model</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="Must-be">Must-be</SelectItem>
                    <SelectItem value="One-Dimensional">
                      One-Dimensional
                    </SelectItem>
                    <SelectItem value="Attractive">Attractive</SelectItem>
                    <SelectItem value="Indifferent">Indifferent</SelectItem>
                    <SelectItem value="Reverse">Reverse</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "MoSCoW":
        return (
          <FormField
            name="moscow"
            control={form.control}
            render={({field}) => (
              <FormItem style={{gridColumn: "span 3 / span 3"}}>
                <FormLabel>MosCoW</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="Must Have">Must Have</SelectItem>
                    <SelectItem value="Should Have">Should Have</SelectItem>
                    <SelectItem value="Could Have">Could Have</SelectItem>
                    <SelectItem value="Wont Have">Won't Have</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "Rice":
        return (
          <Fragment>
            <FormField
              name="reach"
              control={form.control}
              render={({field}) => (
                <FormItem style={{gridColumn: "span 3 / span 3"}}>
                  <FormLabel>Reach</FormLabel>
                  <Input placeholder="reach" onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confidence"
              control={form.control}
              render={({field}) => (
                <FormItem style={{gridColumn: "span 3 / span 3"}}>
                  <FormLabel>Reach</FormLabel>
                  <Input placeholder="reach" onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </Fragment>
        );
      default:
        return null;
    }
  };
  return selectField();
}
