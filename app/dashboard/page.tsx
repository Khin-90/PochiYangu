import Link from "next/link"
import Image from "next/image"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CreditCard,
  DollarSign,
  Home,
  Menu,
  PieChart,
  Plus,
  Settings,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link href="#" className="flex items-center gap-2 text-lg font-semibold text-primary">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="PochiYangu Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span>PochiYangu</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              >
                <BarChart3 className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <CreditCard className="h-5 w-5" />
                Accounts
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <DollarSign className="h-5 w-5" />
                Transactions
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="PochiYangu Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="hidden md:inline">PochiYangu</span>
        </Link>
        <nav className="hidden md:flex md:gap-2 lg:gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <CreditCard className="h-5 w-5" />
            <span>Accounts</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <DollarSign className="h-5 w-5" />
            <span>Transactions</span>
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$7,350.00</div>
              <p className="text-xs text-muted-foreground">+8.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,850.50</div>
              <p className="text-xs text-muted-foreground">+4.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,499.50</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Your financial activity for the past 30 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart will be displayed here
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activities.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Online Purchase</p>
                    <p className="text-sm text-muted-foreground">Amazon.com</p>
                  </div>
                  <div className="ml-auto font-medium text-red-500">-$45.50</div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Salary Deposit</p>
                    <p className="text-sm text-muted-foreground">Employer Inc.</p>
                  </div>
                  <div className="ml-auto font-medium text-green-500">+$2,500.00</div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Grocery Shopping</p>
                    <p className="text-sm text-muted-foreground">Local Market</p>
                  </div>
                  <div className="ml-auto font-medium text-red-500">-$125.30</div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Utility Bill</p>
                    <p className="text-sm text-muted-foreground">Electric Company</p>
                  </div>
                  <div className="ml-auto font-medium text-red-500">-$85.00</div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Freelance Payment</p>
                    <p className="text-sm text-muted-foreground">Client XYZ</p>
                  </div>
                  <div className="ml-auto font-medium text-green-500">+$350.00</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Savings Goals</CardTitle>
              <CardDescription>Track your progress towards financial goals.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Vacation Fund</div>
                    <div className="text-sm text-muted-foreground">65%</div>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-full w-[65%] rounded-full bg-primary" />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <div>$1,950 saved</div>
                    <div>$3,000 goal</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">New Car</div>
                    <div className="text-sm text-muted-foreground">25%</div>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-full w-[25%] rounded-full bg-primary" />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <div>$5,000 saved</div>
                    <div>$20,000 goal</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Emergency Fund</div>
                    <div className="text-sm text-muted-foreground">90%</div>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-full w-[90%] rounded-full bg-primary" />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <div>$9,000 saved</div>
                    <div>$10,000 goal</div>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Goal
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Accounts</CardTitle>
              <CardDescription>Manage your connected accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Checking Account</p>
                      <p className="text-sm text-muted-foreground">**** 4832</p>
                    </div>
                  </div>
                  <div className="font-medium">$12,350.45</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Savings Account</p>
                      <p className="text-sm text-muted-foreground">**** 7291</p>
                    </div>
                  </div>
                  <div className="font-medium">$24,400.00</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Credit Card</p>
                      <p className="text-sm text-muted-foreground">**** 5678</p>
                    </div>
                  </div>
                  <div className="font-medium text-red-500">-$1,250.00</div>
                </div>
                <Button className="w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Account
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bills</CardTitle>
              <CardDescription>Stay on top of your payments.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    <Home className="h-4 w-4" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Rent Payment</p>
                    <p className="text-xs text-muted-foreground">Due in 5 days</p>
                  </div>
                  <div className="ml-auto font-medium">$1,200.00</div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Credit Card Payment</p>
                    <p className="text-xs text-muted-foreground">Due in 12 days</p>
                  </div>
                  <div className="ml-auto font-medium">$350.00</div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Internet Bill</p>
                    <p className="text-xs text-muted-foreground">Due in 8 days</p>
                  </div>
                  <div className="ml-auto font-medium">$75.00</div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Phone Bill</p>
                    <p className="text-xs text-muted-foreground">Due in 15 days</p>
                  </div>
                  <div className="ml-auto font-medium">$45.00</div>
                </div>
                <Button className="w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Bill
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
