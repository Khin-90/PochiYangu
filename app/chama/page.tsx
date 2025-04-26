"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
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
import { useToast } from "@/components/ui/use-toast"

export default function ChamaPage() {
  const { toast } = useToast()
  const [user, setUser] = useState(null)
  const [chamas, setChamas] = useState([])
  const [discoverChamas, setDiscoverChamas] = useState([])
  const [invitations, setInvitations] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newChama, setNewChama] = useState({
    name: '',
    contribution_amount: '',
    frequency: 'monthly',
    target: ''
  })

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        await Promise.all([
          fetchUserChamas(user.id),
          fetchDiscoverChamas(user.id),
          fetchInvitations(user.id)
        ])
      }
    }
    init()
    const subscription = setupRealtime()
    return () => subscription?.unsubscribe()
  }, [])

  const fetchUserChamas = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('chama_members')
        .select(`
          chamas (
            *,
            members:chama_members (user_id, status),
            contributions (amount, created_at)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')

      if (error) throw error
      setChamas(data.map(item => item.chamas))
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message })
    }
  }

  const fetchDiscoverChamas = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('chamas')
        .select('*, members:chama_members (user_id, status)')
        .eq('is_public', true)
        .not('members.user_id', 'eq', userId)

      if (error) throw error
      setDiscoverChamas(data)
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message })
    }
  }

  const fetchInvitations = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('chama_invitations')
        .select('*, chamas (*)')
        .eq('invited_user', userId)
        .eq('status', 'pending')

      if (error) throw error
      setInvitations(data)
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message })
    }
  }

  const handleCreateChama = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('chamas')
        .insert([{
          ...newChama,
          owner_id: user.id,
          current_cycle: 1,
          total_contributions: 0,
          current_cycle_start: new Date().toISOString(),
          created_at: new Date().toISOString()
        }])
        .select()

      if (error) throw error

      await supabase
        .from('chama_members')
        .insert([{
          chama_id: data[0].id,
          user_id: user.id,
          role: 'admin',
          status: 'active'
        }])

      setShowCreateForm(false)
      setNewChama({ name: '', contribution_amount: '', frequency: 'monthly', target: '' })
      await fetchUserChamas(user.id)
      toast({ title: "Success", description: "Chama created successfully!" })
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleJoinChama = async (chamaId) => {
    try {
      const { error } = await supabase
        .from('chama_members')
        .insert([{
          chama_id: chamaId,
          user_id: user.id,
          status: 'pending'
        }])

      if (error) throw error
      await fetchDiscoverChamas(user.id)
      toast({ title: "Success", description: "Join request sent successfully!" })
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message })
    }
  }

  const handleInvitationResponse = async (invitationId, accept) => {
    try {
      const { error } = await supabase
        .from('chama_invitations')
        .update({ status: accept ? 'accepted' : 'declined' })
        .eq('id', invitationId)

      if (error) throw error

      if (accept) {
        const invitation = invitations.find(i => i.id === invitationId)
        await supabase
          .from('chama_members')
          .insert([{
            chama_id: invitation.chamas.id,
            user_id: user.id,
            status: 'active'
          }])
      }

      setInvitations(invitations.filter(i => i.id !== invitationId))
      toast({ title: "Success", description: `Invitation ${accept ? 'accepted' : 'declined'}!` })
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message })
    }
  }

  const setupRealtime = () => {
    return supabase
      .channel('chama-changes')
      .on('postgres_changes', { 
        event: '*',
        schema: 'public',
        table: 'chamas'
      }, () => {
        if (user) {
          fetchUserChamas(user.id)
          fetchDiscoverChamas(user.id)
        }
      })
      .subscribe()
  }

  const calculateCycleProgress = (startDate, frequency) => {
    const now = new Date()
    const start = new Date(startDate)
    let end = new Date(start)
    
    switch(frequency) {
      case 'weekly': end.setDate(end.getDate() + 7); break
      case 'monthly': end.setMonth(end.getMonth() + 1); break
      case 'quarterly': end.setMonth(end.getMonth() + 3); break
    }
    
    const total = end - start
    const current = now - start
    return Math.min((current / total) * 100, 100)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0
    }).format(amount || 0)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header remains same */}

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Chama Groups</h1>
              <p className="text-muted-foreground">Manage your group savings and investment circles.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowCreateForm(true)}>
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

            {/* My Chamas Tab */}
            <TabsContent value="my-chamas" className="mt-6">
              {chamas.length === 0 ? (
                <div className="text-center py-12">
                  <PiggyBank className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No chamas found</h3>
                  <p className="text-muted-foreground mt-2">Get started by creating a new chama.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {chamas.map(chama => (
                    <Card key={chama.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle>{chama.name}</CardTitle>
                          <Badge variant={chama.status === 'active' ? 'default' : 'secondary'}>
                            {chama.status || 'Active'}
                          </Badge>
                        </div>
                        <CardDescription>
                          {chama.members?.length || 0} members • {chama.frequency} contributions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Total Pool</span>
                              <span className="font-bold">{formatCurrency(chama.total_contributions)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Your Contribution</span>
                              <span className="font-medium">
                                {formatCurrency(chama.contributions?.reduce((sum, c) => sum + c.amount, 0))}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Contribution Cycle</span>
                              <span className="text-sm font-medium">
                                {chama.current_cycle || 1}/{chama.total_cycles || 12}
                              </span>
                            </div>
                            <Progress 
                              value={calculateCycleProgress(chama.current_cycle_start || new Date(), chama.frequency)} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild>
                          <Link href={`/chama/${chama.id}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Discover Tab */}
            <TabsContent value="discover" className="mt-6">
              {discoverChamas.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No chamas to discover</h3>
                  <p className="text-muted-foreground mt-2">All public chamas are already joined.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {discoverChamas.map(chama => (
                    <Card key={chama.id}>
                      <CardHeader className="pb-2">
                        <CardTitle>{chama.name}</CardTitle>
                        <CardDescription>
                          {chama.members?.length || 0} members • {chama.frequency} contributions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Monthly Contribution</span>
                            <span className="font-medium">{formatCurrency(chama.contribution_amount)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Total Pool</span>
                            <span className="font-medium">{formatCurrency(chama.total_contributions)}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleJoinChama(chama.id)}>
                          Join Chama
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Invitations Tab */}
            <TabsContent value="invitations" className="mt-6">
              {invitations.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No pending invitations</h3>
                  <p className="text-muted-foreground mt-2">You'll see invitations here when received.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {invitations.map(invitation => (
                    <Card key={invitation.id}>
                      <CardHeader className="pb-2">
                        <CardTitle>{invitation.chamas.name}</CardTitle>
                        <CardDescription>
                          Invited by {invitation.invited_by}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Contribution Amount</span>
                          <span className="font-medium">
                            {formatCurrency(invitation.chamas.contribution_amount)}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => handleInvitationResponse(invitation.id, false)}
                        >
                          Decline
                        </Button>
                        <Button onClick={() => handleInvitationResponse(invitation.id, true)}>
                          Accept
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Create Chama Modal */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">Create New Chama</h3>
                <form onSubmit={handleCreateChama}>
                  <div className="space-y-4">
                    <Input
                      placeholder="Chama Name"
                      value={newChama.name}
                      onChange={(e) => setNewChama({...newChama, name: e.target.value})}
                      required
                    />
                    <Input
                      type="number"
                      placeholder="Contribution Amount"
                      value={newChama.contribution_amount}
                      onChange={(e) => setNewChama({...newChama, contribution_amount: e.target.value})}
                      required
                    />
                    <select
                      value={newChama.frequency}
                      onChange={(e) => setNewChama({...newChama, frequency: e.target.value})}
                      className="w-full p-2 border rounded"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowCreateForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Chama'}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}