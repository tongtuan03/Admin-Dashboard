import { z } from "zod";

export const userSchema = z.object({
    id: z.string().optional(),
    firstName:z.string(),
    lastName:z.string(),
    userName:z.string(),
    email:z.string(),
    phoneNumber:z.string(),
    status:z.enum(["Suspended", "Invited", "Active","Inactive"]),
    role: z.enum(["Superadmin", "Admin", "Manager","Cashier"]),
    password:z.string(),
    confirmPassword:z.string().optional()
});

export type UserFormData = z.infer<typeof userSchema>;