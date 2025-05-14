'use client';
import Link from 'next/link';
import "./globals.css"
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedin = localStorage.getItem('token');
    if (isLoggedin) {
      router.push('/dashboard');
    } 
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to My App</h1>
      <div className="space-x-4">
        <Link href="/auth/login">
          <Button variant={'outline'} className="px-6 py-2  text-black rounded cursor-pointer">Login</Button>
        </Link>
        <Link href="/auth/signup">
          <Button variant={'default'} className="px-6 py-2  text-white rounded cursor-pointer">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
