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
import { Label } from "@/components/ui/label";
import { UserFormData, userSchema } from "@/models/userForm";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";

type Props = {
    onSubmit: (data: UserFormData) => void;
    defaultValues?: UserFormData;
};

function UsersForm({
    onSubmit,
    defaultValues,
}: Props) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues,
    });

    React.useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <form className="grid gap-1 px-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 items-center gap-2 mb-4">
                <Label htmlFor="firstName" className="col-span-1 mt-2">First Name</Label>
                <div className="col-span-3">
                    <Input
                        id="firstName"
                        className="w-full"
                        {...register("firstName")}
                        placeholder="John"
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.firstName.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-2 mb-4">
                <Label htmlFor="userName" className="col-span-1 mt-2">Last Name</Label>
                <div className="col-span-3">
                    <Input
                        id="lastName"
                        className="w-full"
                        {...register("lastName")}
                        placeholder="Doe"
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.lastName.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-2 mb-4">
                <Label htmlFor="userName" className="col-span-1 mt-2">Username</Label>
                <div className="col-span-3">
                    <Input
                        id="userName"
                        className="w-full"
                        {...register("userName")}
                        placeholder="john_doe"
                    />
                    {errors.userName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.userName.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-2 mb-4">
                <Label htmlFor="userName" className="col-span-1 mt-2">Email</Label>
                <div className="col-span-3">
                    <Input
                        id="email"
                        className="w-full"
                        {...register("email")}
                        placeholder="john.doe.@gmail.com"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-2 mb-4 text-nowrap">
                <Label htmlFor="phoneNumber" className="col-span-1 mt-2">Phone Number</Label>
                <div className="col-span-3">
                    <Input
                        id="phoneNumber"
                        className="w-full"
                        {...register("phoneNumber")}
                        placeholder="+123456789"
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phoneNumber.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-2 mb-4 text-nowrap">
                <Label>Role</Label>
                <Controller
                    control={control}
                    name="role"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select a Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Role</SelectLabel>
                                    <SelectItem value="Superadmin">Superadmin</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Manager">Manager</SelectItem>
                                    <SelectItem value="Cashier">Cashier</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            <div className="grid grid-cols-4 items-center gap-2 mb-4 text-nowrap">
                <Label>Status</Label>
                <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select a Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="Suspended">Suspended</SelectItem>
                                    <SelectItem value="Invited">Invited</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            <div className="grid grid-cols-4 items-center gap-2 mb-4 text-nowrap">
                <Label htmlFor="phoneNumber" className="col-span-1 mt-2">Password</Label>
                <div className="col-span-3">
                    <PasswordInput
                        id="password"
                        className="w-full"
                        {...register("password")}
                        placeholder="kwe#%$&6132"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-2 mb-4 text-nowrap">
                <Label htmlFor="confirmPassword" className="col-span-1 mt-2">Confirm Password</Label>
                <div className="col-span-3">
                    <PasswordInput
                        id="confirmPassword"
                        className="w-full"
                        {...register("confirmPassword")}
                        placeholder="kwe#%$&6132"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
            </div>


            <DialogFooter>
                <DialogClose asChild>
                    <Button type="submit">Save changes</Button>
                </DialogClose>
            </DialogFooter>
        </form>
    );
}

export default UsersForm;
