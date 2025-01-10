"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import { Task } from "../types";
import { format } from "date-fns";

// Add isDeleting to the props type
type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  isDeleting?: boolean;
};

function getColorByStatus(status: string){
  switch (status) {
    case 'PENDING':
      return 'bg-gray-500 text-white';
    case 'IN_PROGRESS':
      return 'bg-yellow-500 text-black';
    case 'COMPLETED':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

export function TaskCard({ task, onEdit, onDelete, isDeleting }: TaskCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
        <Badge variant="outline" className={`${getColorByStatus(task.status)}`}>{task.status}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{task.description}</p>
        {task.dueDate && (
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Due: {format(new Date(Number(task.dueDate)), 'PPP')}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(task)}
          disabled={isDeleting}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(task.id)}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </CardFooter>
    </Card>
  );
}