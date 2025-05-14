import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input";
import axios from "@/lib/axios";
import { cn } from "@/lib/utils";
import { LoginSchema, loginSchema } from "@/models/authForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onLogin = async (data: LoginSchema) => {
        try {
            const res = await axios.get(`auth?email=${data.email}&password=${data.password}`);
            if (res.data.length === 0) {
                return toast.error('Email and Password not match !', {
                    duration: 2000
                });
            }
            localStorage.setItem('token', Math.random().toString(36).substring(2));
            toast.success('Login successful!');
            router.push('/dashboard');
        } catch {
            toast.error('Login failed !', {
                duration: 2000
            });
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onLogin)}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className={errors.email ? 'text-red-600' : ''}>
                        Email
                    </Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        className={cn(
                            'transition-colors',
                            errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''
                        )}
                        {...register('email')}
                    />
                    {errors.email && (
                        <span className="text-sm text-red-500">{errors.email.message}</span>
                    )}
                </div>

                <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between">
                        <Label
                            htmlFor="password"
                            className={errors.password ? 'text-red-600' : ''}
                        >
                            Password
                        </Label>
                        <span className="font-medium text-sm cursor-pointer text-gray-500 hover:text-gray-300">
                            Forgot password?
                        </span>
                    </div>
                    <PasswordInput
                        id="password"
                        placeholder="********"
                        className={cn(
                            'transition-colors',
                            errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''
                        )}
                        {...register('password')}
                    />
                    {errors.password && (
                        <span className="text-sm text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <Button type="submit" className="cursor-pointer">Login</Button>
            </div>
        </form>
    );
}
export default LoginForm;