"use client"
import { useEffect, useRef, useState } from "react";
import { DataTable } from "./data-table"
import axios from "@/lib/axios";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import TasksForm, { TaskFormRef } from "./tasks-form";
import { TaskFormData } from "@/models/taskForm";
import { getColumns } from "./columns";
export default function TaskPage() {
  const [data, setData] = useState<TaskFormData[]>([])
  const formRef = useRef<TaskFormRef>(null);
  const handleSubmit = async (data: TaskFormData) => {
    console.log("Submitted from parent:", data);
    const task: TaskFormData = {
      id: "TASK-9873",
      title: data.title,
      status: data.status,
      label: data.label,
      priority: data.priority
    }
    try {
      const response = await axios.post("/tasks", task);
      fetchData();
      console.log("✅ Task created:", response.data);

    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  
  const fetchData = () => {
    axios.get("/tasks")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <div className="container flex justify-between mx-auto  pt-10 ">
        <div>
          <h1 className="font-bold">Task</h1>
          <h2>Here's a list of your tasks for this month!</h2>
        </div>
        <div>
          <Sheet>
            <SheetTrigger asChild><Button className="cursor-pointer">Create <Plus /></Button></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create Task</SheetTitle>
                <SheetDescription>
                  Add a new task by providing necessary info.Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <TasksForm ref={formRef} onSubmit={handleSubmit} mode="create" />
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={() => { formRef.current?.submit() }}>Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="container mx-auto">
        <DataTable columns={getColumns(fetchData)} data={data} />
      </div>
    </div>

  )
}
