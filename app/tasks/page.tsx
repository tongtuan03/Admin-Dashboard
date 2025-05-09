"use client"
import { useEffect, useState } from "react";
import { DataTable } from "./data-table"
import axios from "@/lib/axios";
import { columns, Task } from "./columns";
export default function TaskPage() {
  const [data, setData] = useState<Task[]>([])

  useEffect(() => {
    axios.get("/tasks")
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (

    <div>
      <div className="container mx-auto  pt-10 "> 
        <h1 className="font-bold">Task</h1>
        <h2>Here's a list of your tasks for this month!</h2>
      </div>
      <div className="container mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>

  )
}
