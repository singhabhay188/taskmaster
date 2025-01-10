import { Button } from "@/components/ui/button";
import { Plus, ListTodo } from "lucide-react";
import Link from "next/link";

export default function Navbar(){
     return (
          <div className="flex justify-between items-center shadow-md px-6 mb-4 py-4">
               <div className="flex items-center space-x-2">
                    <ListTodo className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold bg-gradient-to-tr from-gray-900 via-violet-900 to-gray-900 bg-clip-text text-transparent">TaskMaster</h1>
               </div>
               <Link href="/tasks/new">
                    <Button className="bg-gradient-to-tr from-gray-900 via-violet-900 to-gray-900">
                         <Plus className="h-4 w-4 mr-2" />
                         New Task
                    </Button>
               </Link>
          </div>
     )
}