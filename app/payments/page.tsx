import Link from "next/link"
import Image from "next/image"
import { ArrowRight, DollarSign, Globe, Menu, RefreshCw, Send, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function PaymentsPage() {
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
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary">
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
                href="/"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <DollarSign className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <DollarSign className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/payments"
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              >
                <Send className="h-5 w-5" />
                Payments
              </Link>
              <Link
                href="/chama"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Users className="h-5 w-5" />
                Chama Groups
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
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
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <DollarSign className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <DollarSign className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/payments"
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
          >
            <Send className="h-5 w-5" />
            <span>Payments</span>
          </Link>
          <Link
            href="/chama"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Users className="h-5 w-5" />
            <span>Chama Groups</span>
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Cross-Border Payments</h1>
              <p className="text-muted-foreground">Send money globally with low fees and competitive exchange rates.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Transaction History
              </Button>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                New Payment
              </Button>
            </div>
          </div>

          <Tabs defaultValue="send" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="send">Send Money</TabsTrigger>
              <TabsTrigger value="request">Request Money</TabsTrigger>
              <TabsTrigger value="exchange">Currency Exchange</TabsTrigger>
            </TabsList>
            <TabsContent value="send" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send Money Internationally</CardTitle>
                  <CardDescription>Transfer funds to friends, family, or businesses worldwide.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient</Label>
                      <Select>
                        <SelectTrigger id="recipient">
                          <SelectValue placeholder="Select recipient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Add New Recipient</SelectItem>
                          <SelectItem value="john">John Smith</SelectItem>
                          <SelectItem value="maria">Maria Garcia</SelectItem>
                          <SelectItem value="ahmed">Ahmed Hassan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select>
                        <SelectTrigger id="payment-method">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="balance">PochiYangu Balance</SelectItem>
                          <SelectItem value="bank">Bank Account</SelectItem>
                          <SelectItem value="card">Debit/Credit Card</SelectItem>
                          <SelectItem value="mpesa">M-Pesa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="amount">You Send</Label>
                      <div className="flex">
                        <Select>
                          <SelectTrigger className="w-[100px] rounded-r-none">
                            <SelectValue placeholder="USD" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                            <SelectItem value="gbp">GBP</SelectItem>
                            <SelectItem value="kes">KES</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input id="amount" type="number" placeholder="0.00" className="rounded-l-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="receive-amount">They Receive</Label>
                      <div className="flex">
                        <Select>
                          <SelectTrigger className="w-[100px] rounded-r-none">
                            <SelectValue placeholder="KES" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kes">KES</SelectItem>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                            <SelectItem value="gbp">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input id="receive-amount" type="number" placeholder="0.00" className="rounded-l-none" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Exchange Rate</span>
                      <span className="font-medium">1 USD = 130.25 KES</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm">Transfer Fee</span>
                      <span className="font-medium">$2.99</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm">Delivery Time</span>
                      <span className="font-medium">1-2 Business Days</span>
                    </div>
                    <div className="mt-2 pt-2 border-t flex items-center justify-between">
                      <span className="text-sm font-medium">Total to Pay</span>
                      <span className="font-bold">$102.99</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose of Payment</Label>
                    <Select>
                      <SelectTrigger id="purpose">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="family">Family Support</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="request" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Money</CardTitle>
                  <CardDescription>Request funds from anyone, anywhere in the world.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="request-from">Request From</Label>
                    <Input id="request-from" placeholder="Email or mobile number" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="request-amount">Amount</Label>
                      <div className="flex">
                        <Select>
                          <SelectTrigger className="w-[100px] rounded-r-none">
                            <SelectValue placeholder="USD" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                            <SelectItem value="gbp">GBP</SelectItem>
                            <SelectItem value="kes">KES</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input id="request-amount" type="number" placeholder="0.00" className="rounded-l-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-reason">Reason (Optional)</Label>
                      <Input id="request-reason" placeholder="e.g., Dinner last night" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="request-note">Note to Recipient</Label>
                    <Input id="request-note" placeholder="Add a personal note" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Request Payment</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="exchange" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Currency Exchange</CardTitle>
                  <CardDescription>Convert between currencies at competitive rates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="from-currency">From</Label>
                      <div className="flex">
                        <Select>
                          <SelectTrigger className="w-[100px] rounded-r-none">
                            <SelectValue placeholder="USD" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                            <SelectItem value="gbp">GBP</SelectItem>
                            <SelectItem value="kes">KES</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input id="from-currency" type="number" placeholder="0.00" className="rounded-l-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to-currency">To</Label>
                      <div className="flex">
                        <Select>
                          <SelectTrigger className="w-[100px] rounded-r-none">
                            <SelectValue placeholder="KES" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kes">KES</SelectItem>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                            <SelectItem value="gbp">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input id="to-currency" type="number" placeholder="0.00" className="rounded-l-none" disabled />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Exchange Rate</span>
                      <span className="font-medium">1 USD = 130.25 KES</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm">Fee</span>
                      <span className="font-medium">$1.99</span>
                    </div>
                    <div className="mt-2 pt-2 border-t flex items-center justify-between">
                      <span className="text-sm font-medium">You'll receive</span>
                      <span className="font-bold">13,025.00 KES</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Exchange Currency</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Global Coverage</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">200+</div>
                <p className="text-xs text-muted-foreground">Countries and territories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Competitive Rates</CardTitle>
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Up to 4%</div>
                <p className="text-xs text-muted-foreground">Better than bank exchange rates</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fast Transfers</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1-2 Days</div>
                <p className="text-xs text-muted-foreground">For most international transfers</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">Recent Recipients</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { name: "John Smith", country: "United States", image: "/placeholder-user.jpg" },
                { name: "Maria Garcia", country: "Mexico", image: "/placeholder-user.jpg" },
                { name: "Ahmed Hassan", country: "Egypt", image: "/placeholder-user.jpg" },
                { name: "Li Wei", country: "China", image: "/placeholder-user.jpg" },
              ].map((recipient, index) => (
                <Button key={index} variant="outline" className="flex flex-col items-center justify-center h-auto p-4">
                  <Avatar className="h-12 w-12 mb-2">
                    <AvatarImage src={recipient.image || "/placeholder.svg"} alt={recipient.name} />
                    <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{recipient.name}</span>
                  <span className="text-xs text-muted-foreground">{recipient.country}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
