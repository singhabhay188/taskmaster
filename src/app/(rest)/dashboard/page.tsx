"use client";
import { useQuery, useMutation, gql } from "@apollo/client";
import { TaskCard } from "@/components/task-card";
import { Task } from "@/types";
import { useState } from "react";
import MessageViewer from "@/components/message-viewer";
import { toast } from "react-hot-toast";

// Define your GraphQL query
const GET_TASKS = gql`
  query GET_TASKS {
    tasks {
      title
      description
      status
      dueDate
      id
    }
  }
`;

const DELETE_TASK = gql`
  mutation Mutation($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId)
  }
`;

export default function DashboardPage() {
  const { loading, error, data, refetch } = useQuery(GET_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const handleDelete = async (taskId: string) => {
    try {
      setDeletingTaskId(taskId);
      await deleteTask({
        variables: {
          deleteTaskId: taskId
        }
      });
      await refetch();
      toast.success('Successfully deleted!');
    } catch (err) {
      console.error('Error deleting task:', err);
    } finally {
      setDeletingTaskId(null);
    }
  };

  if (loading) return <MessageViewer message="Loading tasks..." />;
  if (error) return <MessageViewer message={`Error: ${error.message}`} />;

  return (
    <div className="space-y-4">
      <div className="border-b-2 pb-4">
        <h3 className="text-xl font-semibold">In Progress Task</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
          {data.tasks.filter((task: Task) => task.status === 'IN_PROGRESS').length === 0 ? (
            <MessageViewer message="No tasks in progress." />
          ) : (
            data.tasks.filter((task: Task) => task.status === 'IN_PROGRESS').map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={(task) => {
                  window.location.href = `/tasks/${task.id}`;
                }}
                onDelete={handleDelete}
                isDeleting={deletingTaskId === task.id}
              />
            ))
          )}
        </div>
      </div>

      <div className="border-b-2 pb-4">
        <h3 className="text-xl font-semibold">PENDING Task</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
          {data.tasks.filter((task: Task) => task.status === 'PENDING').length === 0 ? (
            <MessageViewer message="No pending tasks." />
          ) : (
            data.tasks.filter((task: Task) => task.status === 'PENDING').map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={(task) => {
                  window.location.href = `/tasks/${task.id}`;
                }}
                onDelete={handleDelete}
                isDeleting={deletingTaskId === task.id}
              />
            ))
          )}
        </div>
      </div>

      <div className="border-b-2 pb-4">
        <h3 className="text-xl font-semibold">Completed Task</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
          {data.tasks.filter((task: Task) => task.status === 'COMPLETED').length === 0 ? (
            <MessageViewer message="No completed tasks." />
          ) : (
            data.tasks.filter((task: Task) => task.status === 'COMPLETED').map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={(task) => {
                  window.location.href = `/tasks/${task.id}`;
                }}
                onDelete={handleDelete}
                isDeleting={deletingTaskId === task.id}
              />
            ))
          )}
        </div>
      </div>

      {data.tasks.length === 0 && <MessageViewer message="No tasks found. Create a new task to get started!" />}

    </div>
  );
}
