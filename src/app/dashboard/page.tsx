'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MessageViewer from "@/components/message-viewer";
import { DELETE_TASK, GET_TASKS } from "@/graphql/queries";
import client from "@/lib/graphqlClient";
import { Task } from "@/types";
import { TaskCard } from "@/components/task-card";
import { useState } from "react";
import toast from "react-hot-toast";
import { EditTaskContent } from "@/components/edit-task-content";
import { DialogTitle } from "@radix-ui/react-dialog";

const fetchTasks = async () => {
  const data:any = await client.request(GET_TASKS);
  return data.tasks;
};

const deleteTask = async (id: string) => {
  const data = await client.request(DELETE_TASK, {
    deleteTaskId: id
  });
  return data;
};

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isLoading, isError } = useQuery({ 
    queryKey: ["tasks"], 
    queryFn: fetchTasks 
  });
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const { mutate: delTask, isPending, variables } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  });

  function handleClose() {
    setIsOpen(false);
  }
  function handleOpen() {
      setIsOpen(true);
  }

  const handleDelete = async (taskId: string) => {
    delTask(taskId);
  };

  if (isLoading) return <MessageViewer message="Loading tasks..." />;
  if (isError) {
    return <MessageViewer message={`Error: ${error?.message || "An Error occured while displaying tasks"}`} />;
  }

  const renderTaskSection = (status: string, title: string) => (
    
    <div className="border-b-2 pb-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
        {data?.filter((task: Task) => task.status === status).length === 0 ? (
          <MessageViewer message={`No ${title.toLowerCase()}.`} />
        ) : (
          data?.filter((task: Task) => task.status === status).map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => {setEditingTaskId(task.id); handleOpen(); }}
              onDelete={handleDelete}
              isDeleting={isPending && variables === task.id}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
          <div className="space-y-4">
            {renderTaskSection('IN_PROGRESS', 'In Progress Task')}
            {renderTaskSection('PENDING', 'Pending Task')}
            {renderTaskSection('COMPLETED', 'Completed Task')}
            {data?.length === 0 && <MessageViewer message="No tasks found. Create a new task to get started!" />}
          </div>
    
          <Dialog open={isOpen} onOpenChange={() => { setEditingTaskId(null); handleClose(); }}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent className="max-w-2xl">
              {editingTaskId && <EditTaskContent taskId={editingTaskId} closeDailog={handleClose}/>}
            </DialogContent>
          </Dialog>
        </>
  );
}
