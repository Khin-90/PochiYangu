"use client"

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (formData.password && formData.confirmPassword && 
        formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError(prev => prev === "Passwords do not match" ? "" : prev);
    }
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (formData.password.match(/[A-Z]/)) strength++;
    if (formData.password.match(/[0-9]/)) strength++;
    if (formData.password.match(/[^A-Za-z0-9]/)) strength++;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (passwordStrength < 3) {
      setError("Password must contain at least 8 characters, one uppercase letter, and one number");
      setIsLoading(false);
      return;
    }

    if (!formData.termsAccepted) {
      setError("You must accept the terms and privacy policy");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
          emailRedirectTo: `${location.origin}/dashboard`,
        }
      });

      if (authError) throw authError;
      
      if (!data.user?.identities?.length) {
        throw new Error("User already exists");
      }

      await supabase
        .from('accounts')
        .insert([{
          user_id: data.user.id,
          account_name: 'Primary Account',
          account_type: 'checking',
          balance: 200000.00,
          currency: 'KES'
        }]);

      setEmailSent(true);
      setTimeout(() => router.push('/dashboard'), 3000);

    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColors = [
    "bg-sky-100",
    "bg-sky-200",
    "bg-sky-400",
    "bg-sky-600",
    "bg-sky-800"
  ];

  return (
    <div className="flex min-h-screen bg-sky-50">
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="mb-4 animate-bounce">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={80}
                height={80}
                className="rounded-lg bg-sky-100 p-2 mx-auto"
              />
            </div>
            <div className="text-sky-600 font-semibold animate-pulse">
              Creating PochiYangu Account...
            </div>
            <div className="mt-4 text-sm text-sky-500">
              Redirecting to dashboard in 3 seconds...
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
            <Link href="/" className="mb-8">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={60}
                height={60}
                className="rounded-lg bg-sky-100 p-2"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-bold leading-9 tracking-tight text-sky-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-sky-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-sky-700 hover:text-sky-600">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-sky-100">
            {emailSent ? (
              <div className="text-center space-y-4">
                <div className="text-sky-600 text-2xl font-bold">✓ Email Sent!</div>
                <p className="text-sky-500">
                  We've sent a confirmation link to <span className="font-semibold">{formData.email}</span>
                </p>
                <p className="text-sm text-sky-400">
                  You'll be automatically redirected to the dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Keep the existing form fields exactly as they were */}
                {/* ... (all your existing form JSX here) ... */}
              </form>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/finance-dashboard-preview.jpg"
          alt="Financial dashboard preview"
          width={1920}
          height={1080}
          priority
        />
      </div>
    </div>
  );
}