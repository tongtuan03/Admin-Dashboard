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
import axios from "@/lib/axios"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import TasksForm, { } from "./tasks-form"
import { TaskFormData } from "@/models/taskForm"
import { toast } from "sonner"
export const getColumns = (fetchData: () => void): ColumnDef<TaskFormData>[] => [
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
        accessorKey: "id",
        header: "Task",
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            const task = row.original;
            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground border-2 rounded-sm p-0.5">{task.label}</span>
                    <span className="font-medium">{task.title}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue || filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(columnId));
        }

    },
    {
        accessorKey: "priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Priority" />
        ),
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue || filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(columnId));
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const task = row.original;
            const handleDelete = async () => {
                axios.delete(`/tasks/${task.id}`)
                    .then(() => {
                        toast.success('Task deleted successfully!', {
                            duration: 2000
                        });
                        fetchData();
                    })
                    .catch((error) => {
                        toast.success("Error deleting Task:" + error, {
                            duration: 2000
                        });
                    });
            };
            const handleUpdate = async (data: TaskFormData) => {
                console.log("Submitted from parent:", data);
                axios.put(`/tasks/${task.id}`, {
                    title: data.title,
                    status: data.status,
                    label: data.label,
                    priority: data.priority
                })
                    .then((res) => {
                        toast.success('Task updated successfully!', {
                            duration: 2000
                        });
                        fetchData();
                    })
                    .catch((error) => {
                        toast.success("Error updating Task:" + error, {
                            duration: 2000
                        });
                    });
            };
            return (
                <AlertDialog>
                    <Sheet>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <SheetTrigger asChild>
                                    <DropdownMenuItem
                                        className="flex justify-between"
                                    >
                                        Edit
                                        <Edit />
                                    </DropdownMenuItem>
                                </SheetTrigger>
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
                                <AlertDialogTitle>Delete this task: {task.id} ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You are about to delete a task with the ID {task.id}.
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500" onClick={handleDelete}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>

                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>
                                    Update Task</SheetTitle>
                                <SheetDescription>
                                    Update the task by providing necessary info.Click save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <TasksForm onSubmit={handleUpdate} defaultValues={task} />
                        </SheetContent>
                    </Sheet>
                </AlertDialog>
            )
        },
    },
]
