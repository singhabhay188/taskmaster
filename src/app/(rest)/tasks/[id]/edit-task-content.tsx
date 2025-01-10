'use client';

import { useQuery, gql } from "@apollo/client";
import { TaskEditForm } from "@/components/task-form-edit";
import MessageViewer from "@/components/message-viewer";

const GET_TASK_BY_ID = gql`
  query GetTask($id: String!) {
    taskById(id: $id) {
     id
     title
     description
     status
     dueDate
    }
  }
`;

export function EditTaskContent({ taskId }: { taskId: string }) {
  const { data, loading, error } = useQuery(GET_TASK_BY_ID, {
    variables: { id: taskId },
  });

  if (loading) return <MessageViewer message="Loading Task Edit Form ...." />;
  if (error) return <MessageViewer message={error.message} />;
  
  if (data) return <TaskEditForm initialData={data.taskById} />;

//   if(data){
//      console.log(data);
//      return <h1>Namaste Task found</h1>
//   }

  return null;
}
