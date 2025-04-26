"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowRight,
  Banknote,
  CreditCard,
  DollarSign,
  Globe,
  Menu,
  Plus,
  RefreshCw,
  Send,
  Smartphone,
  Users 
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function PaymentsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [recipients, setRecipients] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'KES',
    recipient: '',
    paymentMethod: '',
    note: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login')
      
      setUser(user)

      const { data: recipientsData } = await supabase
        .from('recipients')
        .select('*')
        .eq('user_id', user.id)

      const { data: methodsData } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('user_id', user.id)

      setRecipients(recipientsData || [])
      setPaymentMethods(methodsData || [])
    }

    fetchData()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const amount = parseFloat(formData.amount)
    if (isNaN(amount)) {
      alert("Please enter a valid amount")
      return
    }

    const fee = amount * 0.015 // 1.5% fee

    const { error } = await supabase.from('transactions').insert([{
      user_id: user.id,
      amount: amount,
      currency: formData.currency,
      fee: fee,
      status: 'pending',
      payment_method_id: formData.paymentMethod
    }])

    if (error) {
      console.error('Transaction failed:', error)
      return
    }

    // Redirect to transaction status page
    router.push('/dashboard/transactions')
  }

  const getInitials = () => {
    if (!user) return ''
    const meta = user.user_metadata
    return `${meta?.first_name?.[0] || ''}${meta?.last_name?.[0] || ''}`.toUpperCase()
  }

  return (
    <div className="flex min-h-screen flex-col bg-sky-50">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-sky-600">
                <Image
                  src="/logo.svg"
                  alt="PochiYangu Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span>PochiYangu</span>
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-sky-600">
                <DollarSign className="h-5 w-5" />
                Dashboard
              </Link>
              <Link href="/payments" className="flex items-center gap-2 rounded-lg bg-sky-100 px-3 py-2 text-sky-600">
                <Send className="h-5 w-5" />
                Payments
              </Link>
              <Link href="/chama" className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-sky-600">
                <Users className="h-5 w-5" />
                Chama Groups
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Image
            src="/logo.svg"
            alt="PochiYangu Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="hidden md:inline">PochiYangu</span>
        </Link>
        <nav className="hidden md:flex md:gap-2 lg:gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-sky-600">
            <DollarSign className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/payments" className="flex items-center gap-2 rounded-lg bg-sky-100 px-3 py-2 text-sky-600">
            <Send className="h-5 w-5" />
            Payments
          </Link>
          <Link href="/chama" className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-sky-600">
            <Users className="h-5 w-5" />
            Chama Groups
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-sky-100">
            <h1 className="text-2xl font-bold text-sky-900 mb-6">Send Money</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sky-700">Recipient</Label>
                <Select
                  value={formData.recipient}
                  onValueChange={value => setFormData({...formData, recipient: value})}
                >
                  <SelectTrigger className="border-sky-200">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipients.map(recipient => (
                      <SelectItem key={recipient.id} value={recipient.id}>
                        {recipient.name} ({recipient.country})
                      </SelectItem>
                    ))}
                    <SelectItem value="new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Recipient
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sky-700">Amount</Label>
                  <div className="flex">
                    <Select
                      value={formData.currency}
                      onValueChange={value => setFormData({...formData, currency: value})}
                    >
                      <SelectTrigger className="w-[100px] border-sky-200 rounded-r-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KES">KES</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      className="rounded-l-none border-sky-200"
                      value={formData.amount}
                      onChange={e => setFormData({...formData, amount: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sky-700">Payment Method</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={value => setFormData({...formData, paymentMethod: value})}
                  >
                    <SelectTrigger className="border-sky-200">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map(method => (
                        <SelectItem key={method.id} value={method.id}>
                          {method.type === 'mpesa' && `M-Pesa ••• ${method.details.phone?.slice(-4)}`}
                          {method.type === 'card' && `Card ••• ${method.details.last4}`}
                          {method.type === 'bank' && method.details.bank_name}
                        </SelectItem>
                      ))}
                      <SelectItem value="new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sky-700">Note (optional)</Label>
                <Input
                  className="border-sky-200"
                  value={formData.note}
                  onChange={e => setFormData({...formData, note: e.target.value})}
                  placeholder="Add a personal message"
                />
              </div>

              <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
                <div className="flex justify-between items-center">
                  <span className="text-sky-700">Transfer Fee:</span>
                  <span className="font-medium text-sky-900">
                    {formData.amount ? (parseFloat(formData.amount) * 0.015).toFixed(2) : 0.00} {formData.currency}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-sky-100 flex justify-between items-center">
                  <span className="text-sky-700 font-medium">Total:</span>
                  <span className="text-xl font-bold text-sky-900">
                    {formData.amount ? (parseFloat(formData.amount) * 1.015).toFixed(2) : 0.00} {formData.currency}
                  </span>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 h-12 text-lg"
              >
                Send Payment
              </Button>
            </form>
          </div>

          {/* Payment Methods Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 border border-sky-100">
            <h2 className="text-xl font-bold text-sky-900 mb-4">Your Payment Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map(method => (
                <div key={method.id} className="p-4 border border-sky-200 rounded-lg hover:border-sky-300 transition-colors">
                  <div className="flex items-center gap-4">
                    {method.type === 'mpesa' && (
                      <div className="bg-sky-100 p-2 rounded-full">
                        <Smartphone className="h-6 w-6 text-sky-600" />
                      </div>
                    )}
                    {method.type === 'card' && (
                      <div className="bg-sky-100 p-2 rounded-full">
                        <CreditCard className="h-6 w-6 text-sky-600" />
                      </div>
                    )}
                    {method.type === 'bank' && (
                      <div className="bg-sky-100 p-2 rounded-full">
                        <Banknote className="h-6 w-6 text-sky-600" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-sky-900">
                        {method.type === 'mpesa' && `M-Pesa ••• ${method.details.phone?.slice(-4)}`}
                        {method.type === 'card' && `Card ••• ${method.details.last4}`}
                        {method.type === 'bank' && method.details.bank_name}
                      </h3>
                      <p className="text-sm text-sky-500">
                        {method.is_default && 'Default • '}
                        Added {new Date(method.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline"
                className="h-full border-sky-200 text-sky-600 hover:bg-sky-50 hover:text-sky-700"
                onClick={() => router.push('/add-payment-method')}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add New Method
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}