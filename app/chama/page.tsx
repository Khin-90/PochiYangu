import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, DollarSign, Menu, PiggyBank, Plus, Send, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function ChamaPage() {
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
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Send className="h-5 w-5" />
                Payments
              </Link>
              <Link
                href="/chama"
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
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
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Send className="h-5 w-5" />
            <span>Payments</span>
          </Link>
          <Link
            href="/chama"
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
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
              <h1 className="text-2xl font-bold tracking-tight">Chama Groups</h1>
              <p className="text-muted-foreground">Manage your group savings and investment circles.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Join a Chama
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Chama
              </Button>
            </div>
          </div>

          <Tabs defaultValue="my-chamas" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-chamas">My Chamas</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="invitations">Invitations</TabsTrigger>
            </TabsList>
            <TabsContent value="my-chamas" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Family Savings Circle</CardTitle>
                      <Badge>Active</Badge>
                    </div>
                    <CardDescription>10 members • Monthly contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Pool</span>
                          <span className="font-bold">KES 120,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Your Contribution</span>
                          <span className="font-medium">KES 12,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Next Payout</span>
                          <span className="font-medium">15 May 2023</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Contribution Cycle</span>
                          <span className="text-sm font-medium">3/12</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Business Investment Group</CardTitle>
                      <Badge>Active</Badge>
                    </div>
                    <CardDescription>8 members • Quarterly contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Pool</span>
                          <span className="font-bold">KES 240,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Your Contribution</span>
                          <span className="font-medium">KES 30,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Next Payout</span>
                          <span className="font-medium">30 June 2023</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Contribution Cycle</span>
                          <span className="text-sm font-medium">2/8</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Women's Empowerment Fund</CardTitle>
                      <Badge>Active</Badge>
                    </div>
                    <CardDescription>15 members • Weekly contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Pool</span>
                          <span className="font-bold">KES 75,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Your Contribution</span>
                          <span className="font-medium">KES 5,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Next Payout</span>
                          <span className="font-medium">7 May 2023</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Contribution Cycle</span>
                          <span className="text-sm font-medium">6/15</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Upcoming Contributions</CardTitle>
                  <CardDescription>Your scheduled payments for the next 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Family Savings Circle</p>
                        <p className="text-xs text-muted-foreground">Due in 5 days</p>
                      </div>
                      <div className="ml-auto font-medium">KES 4,000</div>
                    </div>
                    <div className="flex items-center">
                      <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Women's Empowerment Fund</p>
                        <p className="text-xs text-muted-foreground">Due tomorrow</p>
                      </div>
                      <div className="ml-auto font-medium">KES 1,000</div>
                    </div>
                    <div className="flex items-center">
                      <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Business Investment Group</p>
                        <p className="text-xs text-muted-foreground">Due in 25 days</p>
                      </div>
                      <div className="ml-auto font-medium">KES 30,000</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="discover" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Discover Chama Groups</CardTitle>
                  <CardDescription>Find and join groups that match your savings goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input type="search" placeholder="Search for chama groups" />
                      <Button type="submit">Search</Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle>Tech Entrepreneurs Circle</CardTitle>
                          <CardDescription>23 members • Monthly contributions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Monthly Contribution</span>
                              <span className="font-medium">KES 5,000</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Total Pool</span>
                              <span className="font-medium">KES 115,000</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Focus</span>
                              <span className="font-medium">Tech Startups</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Request to Join</Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle>Real Estate Investment Club</CardTitle>
                          <CardDescription>12 members • Quarterly contributions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Quarterly Contribution</span>
                              <span className="font-medium">KES 50,000</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Total Pool</span>
                              <span className="font-medium">KES 600,000</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Focus</span>
                              <span className="font-medium">Property Investment</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Request to Join</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="invitations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chama Invitations</CardTitle>
                  <CardDescription>Groups you've been invited to join</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Youth Savings Initiative</CardTitle>
                        <CardDescription>18 members • Monthly contributions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Monthly Contribution</span>
                            <span className="font-medium">KES 2,000</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Total Pool</span>
                            <span className="font-medium">KES 36,000</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Invited By</span>
                            <span className="font-medium">Jane Doe</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">Decline</Button>
                        <Button>Accept Invitation</Button>
                      </CardFooter>
                    </Card>

                    <div className="text-center text-muted-foreground p-4">No more invitations at this time.</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <h2 className="text-xl font-bold">How Chama Works</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Join or Create</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Join an existing Chama group or create your own with friends, family, or colleagues who share
                    similar financial goals.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <PiggyBank className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Contribute Regularly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Make regular contributions to the group pool according to the agreed schedule - weekly, monthly, or
                    quarterly.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Receive Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Members receive payouts on a rotating basis or according to the group's rules. Track everything
                    transparently in the app.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
