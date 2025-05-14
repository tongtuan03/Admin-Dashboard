'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Facebook, Github } from "lucide-react";
import Link from "next/link";
import AuthFooter from "../components/auth-footer";
import SignupForm from "./signup-form";

export default function LoginPage() {
    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your email and password to create an account.
                    <p className="font-medium text-gray-500">Already have an account? <Link href="/auth/login" className="text-black hover:text-gray-500">Sign In</Link></p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignupForm />
            </CardContent>
            <CardFooter >
                <AuthFooter />
            </CardFooter>
        </Card>
    );
}
