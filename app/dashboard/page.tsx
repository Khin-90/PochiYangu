"use client"

import { useEffect, useState } from "react"
import { DollarSign, Send, Settings, TrendingDown, TrendingUp, Users, Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function HeaderNav() {
  return (
    <div className="flex items-center justify-between px-4 py-3 md:px-6 bg-white dark:bg-gray-900 border-b">
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-lg font-bold text-gray-800 dark:text-white">
          PochiYangu
        </span>
      </Link>

      <nav className="hidden md:flex md:gap-4">
        <Link href="/" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
          <DollarSign className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
          <DollarSign className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/payments" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
          <Send className="h-5 w-5" />
          <span>Payments</span>
        </Link>
        <Link href="/chama" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
          <Send className="h-5 w-5" />
          <span>Chama</span>
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/settings" className="rounded-full p-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
          <Settings className="h-6 w-6" />
        </Link>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-100">
          KY
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('24h')
  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    chamaContributions: 0,
    expenses: 0,
    savings: 0,
    transactions: [] as any[],
    accounts: [] as any[],
    goals: [] as any[],
    bills: [] as any[],
    chamas: [] as any[]
  })

  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [{
      label: 'Expenses',
      data: [] as number[],
      backgroundColor: '#3B82F6',
    }]
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const [
          { data: accounts },
          { data: transactions },
          { data: goals },
          { data: bills },
          { data: chamas }
        ] = await Promise.all([
          supabase.from('accounts').select('*').eq('user_id', user.id),
          supabase.from('transactions').select('*').eq('user_id', user.id).order('transaction_date', { ascending: false }),
          supabase.from('savings_goals').select('*').eq('user_id', user.id),
          supabase.from('bills').select('*').eq('user_id', user.id).order('due_date', { ascending: true }),
          supabase.from('chamas').select('*').eq('user_id', user.id)
        ])

        const totalBalance = accounts?.reduce((sum: number, acc: any) => sum + acc.balance, 0) || 0
        const expenses = transactions?.filter((t: any) => t.transaction_type === 'expense').reduce((sum: number, t: any) => sum + t.amount, 0) || 0
        const savings = goals?.reduce((sum: number, goal: any) => sum + goal.current_amount, 0) || 0
        const chamaContributions = chamas?.reduce((sum: number, chama: any) => sum + chama.contribution_amount, 0) || 0

        const transactionDates = transactions?.map((t: any) => 
          new Date(t.transaction_date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })
        ) || []

        const expenseAmounts = transactions?.filter((t: any) => t.transaction_type === 'expense').map((t: any) => t.amount) || []

        setChartData({
          labels: transactionDates,
          datasets: [{
            label: 'Expenses',
            data: expenseAmounts,
            backgroundColor: '#3B82F6',
          }]
        })

        setDashboardData({
          totalBalance,
          chamaContributions,
          expenses,
          savings,
          transactions: transactions || [],
          accounts: accounts || [],
          goals: goals || [],
          bills: bills || [],
          chamas: chamas || []
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    const subscription = supabase.channel('realtime-transactions')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'transactions'
      }, () => fetchData())
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const filteredTransactions = dashboardData.transactions.filter(transaction => {
    const now = new Date()
    const transactionDate = new Date(transaction.transaction_date)
    const timeDiff = now.getTime() - transactionDate.getTime()
    
    switch(selectedFilter) {
      case '24h': return timeDiff <= 86400000
      case '7d': return timeDiff <= 604800000
      case '30d': return timeDiff <= 2592000000
      default: return true
    }
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: 'Expenditure Overview' },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ''
            if (label) label += ': '
            if (context.parsed.y !== null) 
              label += `Ksh ${context.parsed.y.toLocaleString()}`
            return label
          }
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <HeaderNav />
      
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ksh {dashboardData.totalBalance.toLocaleString()}</div>
              <CardDescription>Across all accounts</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chama Contributions</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ksh {dashboardData.chamaContributions.toLocaleString()}</div>
              <CardDescription>Total contributions</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <TrendingDown className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ksh {dashboardData.expenses.toLocaleString()}</div>
              <CardDescription>This month's spending</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ksh {dashboardData.savings.toLocaleString()}</div>
              <CardDescription>Total savings</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Expenditure patterns</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <Bar data={chartData} options={chartOptions} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Transactions</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedFilter === '24h' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedFilter('24h')}
                    >
                      <Clock className="h-4 w-4 mr-2" /> 24h
                    </Button>
                    <Button
                      variant={selectedFilter === '7d' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedFilter('7d')}
                    >
                      <Calendar className="h-4 w-4 mr-2" /> 7d
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.transaction_date).toLocaleDateString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className={`font-medium ${
                        transaction.transaction_type === 'income' 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.transaction_type === 'income' ? '+' : '-'}
                        Ksh {transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    No transactions found
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Chamas</CardTitle>
              <CardDescription>Active investment groups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {dashboardData.chamas.map((chama) => (
                <div key={chama.id} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{chama.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {chama.members?.length || 0} members
                    </p>
                  </div>
                  <div className="text-primary">
                    Ksh {chama.contribution_amount.toLocaleString()}/mo
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bills</CardTitle>
              <CardDescription>Pending payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {dashboardData.bills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{bill.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Due {new Date(bill.due_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-primary">
                    Ksh {bill.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}