import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, CreditCard, Lock, Shield, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="PochiYangu Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="ml-2 text-xl font-bold">PochiYangu</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Your Financial Future Starts Here
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    PochiYangu helps you manage your money, track expenses, and achieve your financial goals with ease.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="inline-flex items-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#learn-more">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="PochiYangu App Dashboard"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="learn-more">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Core Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to take control of your finances in one place
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Payments & Transfers</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Send money instantly to anyone, anywhere with low transaction fees
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Financial Analytics</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Track your spending habits and get insights to improve your financial health
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Mobile Banking</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Access your accounts, make payments, and manage your money on the go
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Secure Transactions</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Bank-level security with encryption and fraud protection for all your transactions
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Savings Goals</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Set and track financial goals with automated savings plans
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Investment Options</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Grow your wealth with easy access to investment opportunities
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose PochiYangu?</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    We're building the future of finance with technology that makes managing money simple, secure, and
                    accessible to everyone.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-green-500 p-1">
                      <svg
                        className="h-2 w-2 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Simple to Use</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-green-500 p-1">
                      <svg
                        className="h-2 w-2 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Complete Financial Control</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-green-500 p-1">
                      <svg
                        className="h-2 w-2 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Security First</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-green-500 p-1">
                      <svg
                        className="h-2 w-2 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Instant Transactions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center">
            <p className="text-center text-sm">&copy; 2025 PochiYangu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
