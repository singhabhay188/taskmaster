export type Task = {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  dueDate?: string;
};

export type TaskCreate = {
  title: string;
  description: string;
  dueDate?: string;
};
