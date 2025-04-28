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
  const [successMessage, setSuccessMessage] = useState("");

  const strengthColors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  useEffect(() => {
    if (formData.password && formData.confirmPassword && 
        formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
    } else if (error === "Passwords do not match") {
      setError("");
    }
  }, [formData.password, formData.confirmPassword, error]);

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
    setSuccessMessage("");

    // Validation checks
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please enter your full name");
      setIsLoading(false);
      return;
    }

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
      // Sign up with Supabase
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (authError) {
        throw authError;
      }

      // Check if user was created (not just email sent)
      if (data.user) {
        // Create account record
        const { error: dbError } = await supabase
          .from('accounts')
          .insert([{
            user_id: data.user.id,
            account_name: 'Primary Account',
            account_type: 'checking',
            balance: 200000.00,
            currency: 'KES'
          }]);

        if (dbError) throw dbError;

        setSuccessMessage("Account created successfully! Redirecting to verification...");
        setEmailSent(true);
        setTimeout(() => router.push('/verify-email'), 3000);
      } else {
        setSuccessMessage("Verification email sent! Please check your inbox.");
        setEmailSent(true);
      }

    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message.includes('User already registered') 
        ? "This email is already registered. Please sign in."
        : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <div className="mb-6">
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              width={120} 
              height={40} 
              className="mx-auto"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">Check your email</h2>
          <p className="text-gray-600 mb-6">
            {successMessage || "We've sent a verification link to your email address."}
          </p>
          <Button 
            onClick={() => router.push('/login')}
            className="w-full"
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6 text-center">
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            width={120} 
            height={40} 
            className="mx-auto"
          />
          <h1 className="text-2xl font-bold mt-4">Create your account</h1>
          <p className="text-gray-600">Join us today!</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i <= passwordStrength ? strengthColors[passwordStrength - 1] : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Password strength: {passwordStrength < 2 ? "Weak" : passwordStrength < 3 ? "Medium" : "Strong"}
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => 
                setFormData({...formData, termsAccepted: Boolean(checked)})
              }
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}