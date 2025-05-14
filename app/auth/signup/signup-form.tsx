import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input";
import axios from "@/lib/axios";
import { cn } from "@/lib/utils";
import { signupSchema, SignupSchema } from "@/models/authForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignupForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
    });

    const onSignup = async (data: SignupSchema) => {
        try {
            await axios.post('auth/', data);
            router.push('/auth/login');
            toast.success('Sign up successfully!', {
                duration: 2000
            });
        } catch {
            toast.error('Sign up failed !', {
                duration: 2000
            });
        }
    };
    return (
        <form onSubmit={handleSubmit(onSignup)}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className={errors.email ? 'text-red-600' : ''}>Email</Label>
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
                    <Label htmlFor="password"className={errors.password ? 'text-red-600' : ''}>Password</Label>

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
                <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between">
                        <Label htmlFor="confirmPassword"className={errors.confirmPassword ? 'text-red-600' : ''}>Confirm Password</Label>
                    </div>
                    <PasswordInput
                        id="confirmPassword"
                        placeholder="********"
                        className={cn(
                            'transition-colors',
                            errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''
                        )}
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                        <span className="text-sm text-red-500">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                <Button type="submit">Create Account</Button>
            </div>
        </form>
    );
}
export default SignupForm;