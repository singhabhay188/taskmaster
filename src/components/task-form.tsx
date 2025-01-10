"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { taskCreateSchema } from "@/lib/validation";
import { TaskCreate } from "@/types";
import { CREATE_TASK } from '@/graphql/queries';
import client from "@/lib/graphqlClient";
import toast from "react-hot-toast";

const createTaskMutation = async (variables: TaskCreate) => {
  const data = await client.request(CREATE_TASK, variables);
  return data;
};

export function TaskCreateForm({closeDrawer}:{closeDrawer:()=> void}) {
  const queryClient = useQueryClient();
  
  const { mutate: createTask, isPending } = useMutation({
    mutationFn: createTaskMutation,
    onSuccess: () => {
      toast.success('Task created successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      closeDrawer();
    },
    onError: (error) => {
      console.error("Error creating task:", error);
      toast.error('Failed to create task');
    }
  });

  const form = useForm<z.infer<typeof taskCreateSchema>>({
    resolver: zodResolver(taskCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: undefined
    },
  });

  const onSubmit = async (data: z.infer<typeof taskCreateSchema>) => {
    const variables: TaskCreate = {
      title: data.title,
      description: data.description
    };

    if(data.dueDate) {
      variables.dueDate = data.dueDate.toISOString();
    }

    createTask(variables);
  };

  return (
    <div className="p-4 pb-0">

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
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating..." : "Create Task"}
        </Button>
      </form>
    </Form>
    </div>
  );
}