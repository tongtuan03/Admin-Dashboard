// create-tasks-form.tsx

import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TaskFormData, taskSchema } from "@/models/taskForm";



export type TaskFormRef = {
    submit: () => void;
};

type Props = {
    onSubmit: (data: TaskFormData) => void;
    defaultValues?: TaskFormData;
    mode?: "create" | "update";
};

const TasksForm = forwardRef<TaskFormRef, Props>(({ onSubmit, defaultValues, mode = "create" }, ref) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues,
    });

    useImperativeHandle(ref, () => ({
        submit: () => {
            handleSubmit(
                (data) => {
                    console.log(`${mode === "create" ? "Creating" : "Updating"}:`, data);
                    onSubmit(data);
                },
                (errors) => {
                    console.log("Validation failed", errors);
                }
            )();
        },
    }));

    React.useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <form className="grid gap-4 px-4">
            <div className="grid grid-cols-2 items-start gap-4">
                <Label>Title</Label>
                <Input className="col-span-3" {...register("title")} />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4">
                <Label>Status</Label>
                <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="Backlog">Backlog</SelectItem>
                                    <SelectItem value="Todo">Todo</SelectItem>
                                    <SelectItem value="Inprogress">In Progress</SelectItem>
                                    <SelectItem value="Done">Done</SelectItem>
                                    <SelectItem value="Canceled">Canceled</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            <div className="grid grid-cols-1 items-start gap-4">
                <Label>Label</Label>
                <Controller
                    control={control}
                    name="label"
                    render={({ field }) => (
                        <RadioGroup onValueChange={field.onChange} value={field.value}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Documentation" id="Documentation" />
                                <Label htmlFor="Documentation" className="font-thin">Documentation</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Feature" id="Feature" />
                                <Label htmlFor="Feature" className="font-thin">Feature</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Bug" id="Bug" />
                                <Label htmlFor="Bug" className="font-thin">Bug</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.label && <p className="text-red-500 text-sm">{errors.label.message}</p>}
            </div>

            <div className="grid grid-cols-1 items-start gap-4">
                <Label>Priority</Label>
                <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => (
                        <RadioGroup onValueChange={field.onChange} value={field.value}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="High" id="High" />
                                <Label htmlFor="High" className="font-thin">High</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Medium" id="Medium" />
                                <Label htmlFor="Medium" className="font-thin">Medium</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Low" id="Low" />
                                <Label htmlFor="Low" className="font-thin">Low</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
            </div>
        </form>
    );
});

export default TasksForm;
