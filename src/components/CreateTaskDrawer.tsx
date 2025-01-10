"use client";

import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { TaskCreateForm } from "./task-form";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CreateTaskDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    function handleClose() {
        setIsOpen(false);
    }
    function handleOpen() {
        setIsOpen(true);
    }

    return (
        <Drawer open={isOpen} onClose={handleClose}>
            <DrawerTrigger asChild>
                <Button variant="outline" onClick={handleOpen} className="bg-gradient-to-tr from-gray-900 via-violet-900 to-gray-900 text-white hover:text-gray-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle>Creating a New Task</DrawerTitle>
                    </DrawerHeader>
                    
                    <TaskCreateForm closeDrawer={handleClose}/>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline" onClick={handleClose}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}