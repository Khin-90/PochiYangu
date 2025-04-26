// components/Navbar.tsx

"use client";

import Link from "next/link";
import { DollarSign, Send, Users, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Make sure this creates the supabase client correctly.

const Navbar = () => {
  const [initials, setInitials] = useState("U");
  const supabase = createClient(); // Use the supabase client from createClient().

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", user.id)
          .single();

        if (profile) {
          const first = profile.first_name || "";
          const last = profile.last_name || "";
          const userInitials =
            (first.charAt(0) + last.charAt(0)).toUpperCase() || "U";
          setInitials(userInitials);
        }
      }
    };

    fetchUserProfile();
  }, [supabase]); // Adding supabase as a dependency to ensure it's up-to-date.

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Left: Logo + Brand */}
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="PochiYangu Logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-blue-600 dark:text-blue-300">
          PochiYangu
        </span>
      </div>

      {/* Center: Nav Links */}
      <div className="flex gap-6 text-gray-700 dark:text-gray-300 font-medium">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 hover:text-blue-500 transition-colors"
        >
          <DollarSign className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link
          href="/dashboard/deposit"
          className="flex items-center gap-1 hover:text-blue-500 transition-colors"
        >
          <DollarSign className="w-5 h-5" />
          <span>Deposit</span>
        </Link>
        <Link
          href="/dashboard/send"
          className="flex items-center gap-1 hover:text-blue-500 transition-colors"
        >
          <Send className="w-5 h-5" />
          <span>Send</span>
        </Link>
        <Link
          href="/dashboard/chama"
          className="flex items-center gap-1 hover:text-blue-500 transition-colors"
        >
          <Users className="w-5 h-5" />
          <span>Chama</span>
        </Link>
      </div>

      {/* Right: Settings + Profile */}
      <div className="flex items-center gap-4">
        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer" />

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm shadow">
          {initials}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
