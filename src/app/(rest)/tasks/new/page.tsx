import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCreateForm } from "@/components/task-form";

export default function NewTaskPage() {
  return (
    <div>  
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Create New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskCreateForm />
          </CardContent>
        </Card>
    </div>
  );
}