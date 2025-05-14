"use client"
import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/column-header"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import UsersForm, { } from "./users-form"
import { UserFormData } from "@/models/userForm"
import axios from "@/lib/axios"
import { toast } from "sonner"

export const getColumns = (fetchData: () => void): ColumnDef<UserFormData>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "userName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Username" />
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="items-center gap-2">
                    <span>{user.firstName}</span>
                    <span>{user.lastName}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        accessorKey: "status",
        header: "Status",
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue || filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(columnId));
        }
    },
    {
        accessorKey: "role",
        header: "Role",
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue || filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(columnId));
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const User = row.original;
            const handleDelete = async () => {
                axios.delete(`/users/${User.id}`)
                    .then(() => {
                        toast.success('User deleted successfully!', {
                            duration: 2000
                        });

                        fetchData();
                    })
                    .catch((error) => {
                        toast.success("Error deleting User:" + error, {
                            duration: 2000
                        });

                    });
            };
            const handleUpdate = async (data: UserFormData) => {
                axios.put(`/users/${User.id}`, {
                    userName: data.userName,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    role: data.role,
                    password: data.password,
                    status: data.status,
                }).then((res) => {
                    fetchData();
                    toast.success('User updated successfully!', {
                        duration: 2000
                    });

                }).catch((error) => {
                    toast.success("Error updating User:" + error, {
                        duration: 2000
                    });

                });
            };
            return (
                <AlertDialog>
                    <Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem
                                        className="flex justify-between"
                                    >
                                        Edit
                                        <Edit />
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DropdownMenuSeparator />
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="flex justify-between">
                                        Delete <Trash2 />
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete this User: {User.userName} ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You are about to delete a User with the ID {User.userName}.
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500" onClick={handleDelete}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>

                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Edit User</DialogTitle>
                                <DialogDescription>
                                    Update the user here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <UsersForm onSubmit={handleUpdate} defaultValues={User} />
                        </DialogContent>
                    </Dialog>
                </AlertDialog >
            )
        },
    },
]
