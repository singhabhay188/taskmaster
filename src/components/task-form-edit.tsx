"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { UPDATE_TASK } from '@/graphql/queries';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Task } from "@/types";
import client from "@/lib/graphqlClient";
import { taskEditSchema } from "@/lib/validation";
import toast from "react-hot-toast";

const editTaskMutation = async (variables: Task) => {
  const data = await client.request(UPDATE_TASK, variables);
  return data;
};

export function TaskEditForm({ initialData, closeDailog }: { initialData: Task, closeDailog : () => void }) {
  const queryClient = useQueryClient();

  const { mutate: editTask, isPending } = useMutation({
    mutationFn: editTaskMutation,
    onSuccess: () => {
      toast.success('Task Edited successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      closeDailog();
    },
    onError: (error) => {
      console.error("Error creating task:", error);
      toast.error('Failed to create task');
    }
  });

  const form = useForm<z.infer<typeof taskEditSchema>>({
    resolver: zodResolver(taskEditSchema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description,
      status: initialData.status,
      dueDate: initialData.dueDate ? new Date(Number(initialData.dueDate)) : undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof taskEditSchema>) => {
    console.log("Form data:", data);
      
    const variables : Task = {
      id: initialData.id,
      title: data.title,
      description: data.description,
      status: data.status
    };

    if(data.dueDate) {
      variables.dueDate = data.dueDate.toISOString();
    }

    editTask(variables);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter task description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select task status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-full pl-3 text-left font-normal ${
                        !field.value && "text-muted-foreground"
                      }`}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Updating..." : "Update Task"}
        </Button>
      </form>
    </Form>
  );
}