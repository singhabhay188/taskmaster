'use client';

import { useQuery } from "@apollo/client";
import { TaskEditForm } from "@/components/task-form-edit";
import MessageViewer from "@/components/message-viewer";
import { GET_TASK_BY_ID } from "@/graphql/queries";

export function EditTaskContent({ taskId, closeDailog }: { taskId: string, closeDailog: () => void }) {
  const { data, loading, error } = useQuery(GET_TASK_BY_ID, {
    variables: { id: taskId },
  });

  if (loading) return <MessageViewer message="Loading Task Edit Form ...." />;
  if (error) return <MessageViewer message={error.message} />;
  
  if (data) return <TaskEditForm initialData={data.taskById} closeDailog={closeDailog}/>;

//   if(data){
//      console.log(data);
//      return <h1>Namaste Task found</h1>
//   }

  return null;
}
