"use client"
import { useEffect, useState } from "react";
import { DataTable } from "./data-table"
import axios from "@/lib/axios";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { getColumns } from "./columns";
import { UserFormData } from "@/models/userForm";
import UsersForm, { } from "./users-form";
import { toast } from "sonner";
export default function UserPage() {
  const [data, setData] = useState<UserFormData[]>([])
  const handleSubmit = async (data: UserFormData) => {
    const user: UserFormData = {
      id: "user-9873",
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.role,
      password: data.password,
      status: data.status,
    }
    try {
      await axios.post("/users", user);
      fetchData();
      toast.success('User created successfully!', {
        duration: 2000
      });

    } catch (error) {
      toast.error("Error creating user: " + error, {
        duration: 2000
      });
    }
  };

  const fetchData = () => {
    axios.get("/users")
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
          <h1 className="font-bold">User List</h1>
          <h2>Manage your users and their roles here.</h2>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="cursor-pointer">Create <UserPlus /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create new user here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <UsersForm onSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="container mx-auto">
        <DataTable columns={getColumns(fetchData)} data={data} />
      </div>
    </div>
  )
}
