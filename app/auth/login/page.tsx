// app/(auth)/login/page.tsx
'use client';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import LoginForm from "./login-form";
import { Facebook, Github } from "lucide-react";
import Link from "next/link";
import AuthFooter from "../components/auth-footer";
import { useEffect } from "react";

export default function LoginPage() {
    useEffect(() => {
        localStorage.removeItem("token");
    }, [])
    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your email and password below to
                    log into your account
                    <p className="font-medium text-gray-500">Dont have account ? <Link href="/auth/signup" className="text-black hover:text-gray-500">Sign Up</Link></p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter >
                <AuthFooter/>
            </CardFooter>
        </Card>
    );
}
