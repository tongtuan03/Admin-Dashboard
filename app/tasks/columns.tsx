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
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useRef } from "react"
import TasksForm, { TaskFormRef } from "./tasks-form"
import { TaskFormData } from "@/models/taskForm"
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
            const formRef = useRef<TaskFormRef>(null);
            const handleDelete = async () => {
                axios.delete(`/tasks/${task.id}`)
                    .then(() => {
                        console.log("Task deleted successfully:", task.id);
                        fetchData();
                    })
                    .catch((error) => {
                        console.error("Error deleting task:", error);
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
                        console.log("Task updated:", res.data);
                        fetchData();
                    })
                    .catch((err) => {
                        console.error("Error updating task:", err);
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
                            <TasksForm ref={formRef} onSubmit={handleUpdate} mode="update" defaultValues={task} />
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button onClick={() => { formRef.current?.submit() }}>Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </AlertDialog>
            )
        },
    },
]
