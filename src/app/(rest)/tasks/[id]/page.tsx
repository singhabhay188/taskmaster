import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditTaskContent } from "./edit-task-content";

export default async function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="p-3">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Task</CardTitle>
        </CardHeader>
        <CardContent>
          <EditTaskContent taskId={id} />
        </CardContent>
      </Card>
    </div>
  );
}