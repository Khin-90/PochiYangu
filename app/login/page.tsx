"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    if (error && formData.email) {
      setError("");
    }
  }, [formData.email, formData.password]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "email") {
      setEmailValid(validateEmail(value));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      if (data?.user) {
        if (data.user.identities?.length === 0) {
          throw new Error("No user found with these credentials");
        }
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(
        error.message === "Invalid login credentials" 
          ? "Invalid email or password"
          : error.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-sky-100">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
            <Link href="/">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="PochiYangu Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </Link>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-sky-800">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-sky-700">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-sky-600 hover:text-sky-500">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-10 bg-white p-6 rounded-lg shadow-md border border-sky-200">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <Label htmlFor="email" className="text-sky-700">Email address</Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`focus:ring-sky-500 focus:border-sky-500 ${
                      !emailValid && formData.email ? "border-red-500" : ""
                    }`}
                    aria-invalid={!emailValid}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sky-700">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-sky-600 hover:text-sky-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="focus:ring-sky-500 focus:border-sky-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-sm text-sky-600 hover:text-sky-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white relative"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full border-sky-200 hover:bg-sky-50"
                  type="button"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    {/* Google SVG icon */}
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-sky-200 hover:bg-sky-50"
                  type="button"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    {/* Facebook SVG icon */}
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/placeholder.svg?height=1080&width=1920"
          alt="Financial dashboard"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
}