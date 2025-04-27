"use client";
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Users, Plus } from "lucide-react";
import { RealtimeChannel } from '@supabase/supabase-js';

// Define TypeScript interfaces
interface User {
  id: string;
  email?: string;
}

interface ChamaMember {
  count?: number;
  user_id?: string;
}

interface Chama {
  id: string;
  name: string;
  contribution_amount: number | string;
  frequency: string;
  target?: string;
  owner_id: string;
  invitation_code: string;
  current_cycle: number;
  total_contributions: number;
  current_cycle_start: string;
  is_public: boolean;
  members?: ChamaMember[];
}

interface Profile {
  username: string;
}

interface Invitation {
  id: string;
  chama_id: string;
  user_id: string;
  status: string;
  chamas: Chama;
  invited_by?: Profile;
}

interface NewChama {
  name: string;
  contribution_amount: string;
  frequency: string;
  target: string;
}

interface ChamaMemberWithChama {
  chamas: Chama;
}

export default function ChamaPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [chamas, setChamas] = useState<Chama[]>([]);
  const [discoverChamas, setDiscoverChamas] = useState<Chama[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newChama, setNewChama] = useState<NewChama>({
    name: '',
    contribution_amount: '',
    frequency: 'monthly',
    target: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [joinCode, setJoinCode] = useState('');

  // Fetch all necessary data
  useEffect(() => {
    let mounted = true;
    const subscription = setupRealtime();

    const fetchData = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (!mounted) return;
        
        if (error) throw error;
        
        setUser(user ?? null);
        if (user) {
          await Promise.all([
            fetchUserChamas(user.id),
            fetchDiscoverChamas(user.id),
            fetchInvitations(user.id)
          ]);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast({ variant: "destructive", title: "Error", description: error.message });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Fetch user's chamas
  const fetchUserChamas = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('chama_members')
        .select('chamas(*, members:chama_members(count))')
        .eq('user_id', userId)
        .eq('status', 'active')
        .returns<ChamaMemberWithChama[]>();

      if (error) throw error;
      
      const userChamas = data?.map(item => item.chamas).filter((chama): chama is Chama => !!chama) || [];
      setChamas(userChamas);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({ variant: "destructive", title: "Error", description: error.message });
      }
    }
  };

  // Fetch discoverable chamas
  const fetchDiscoverChamas = async (userId: string) => {
    try {
      let query = supabase
        .from('chamas')
        .select('*, members:chama_members(count, user_id)')
        .eq('is_public', true);

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error } = await query.returns<Chama[]>();

      if (error) throw error;
      
      const filtered = data.filter(chama => 
        !chama.members?.some(member => member.user_id === userId)
      );
      setDiscoverChamas(filtered);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({ variant: "destructive", title: "Error", description: error.message });
      }
    }
  };

  // Fetch invitations
  const fetchInvitations = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('chama_invitations')
        .select('*, chamas(*), invited_by:profiles(username)')
        .eq('user_id', userId)
        .eq('status', 'pending')
        .returns<Invitation[]>();

      if (error) throw error;
      setInvitations(data || []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({ variant: "destructive", title: "Error", description: error.message });
      }
    }
  };

  // Handle chama creation
  const handleCreateChama = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const invitationCode = uuidv4();
      const { data, error } = await supabase
        .from('chamas')
        .insert([{
          ...newChama,
          owner_id: user.id,
          invitation_code: invitationCode,
          current_cycle: 1,
          total_contributions: 0,
          current_cycle_start: new Date().toISOString()
        }])
        .select()
        .single<Chama>();

      if (error) throw error;
      if (!data) throw new Error("Failed to create chama");

      await supabase
        .from('chama_members')
        .insert([{
          chama_id: data.id,
          user_id: user.id,
          role: 'admin',
          status: 'active'
        }]);

      setShowCreateForm(false);
      setNewChama({ name: '', contribution_amount: '', frequency: 'monthly', target: '' });
      
      toast({ 
        title: "Chama Created!", 
        description: (
          <div className="flex items-center gap-2">
            <span>Invitation Code: {invitationCode}</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(invitationCode);
                toast({ title: "Copied!", description: "Invitation code copied to clipboard" });
              }}
              className="p-1 rounded hover:bg-gray-100"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        ) 
      });

      await Promise.all([
        fetchUserChamas(user.id),
        fetchDiscoverChamas(user.id)
      ]);
      
      router.push(`/chamas/${data.id}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({ variant: "destructive", title: "Error", description: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle joining by code
  const handleJoinByCode = async () => {
    if (!joinCode.trim()) {
      toast({ title: "Error", description: "Please enter an invitation code" });
      return;
    }

    if (!user) {
      toast({ title: "Error", description: "User not logged in" });
      return;
    }

    try {
      const { data: chama, error: chamaError } = await supabase
        .from('chamas')
        .select('id, is_public')
        .eq('invitation_code', joinCode.trim())
        .single();

      if (chamaError || !chama) throw new Error("Invalid invitation code");

      const { error: memberError } = await supabase
        .from('chama_members')
        .insert({
          chama_id: chama.id,
          user_id: user.id,
          role: 'member',
          status: 'active'
        });

      if (memberError) throw memberError;

      setJoinCode('');
      await Promise.all([
        fetchUserChamas(user.id),
        fetchDiscoverChamas(user.id)
      ]);
      toast({ title: "Success", description: "Successfully joined chama!" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({ variant: "destructive", title: "Error", description: error.message });
      }
    }
  };

  // Handle joining a chama directly
  const handleJoinChama = async (chamaId: string) => {
    if (!user) return;
    
    try {
      await supabase
        .from('chama_members')
        .insert({
          chama_id: chamaId,
          user_id: user.id,
          role: 'member',
          status: 'active'
        });
      
      await Promise.all([
        fetchUserChamas(user.id),
        fetchDiscoverChamas(user.id)
      ]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };

  // Handle invitation responses
  const handleInvitationResponse = async (invitationId: string, accept: boolean) => {
    if (!user) return;
    
    try {
      if (accept) {
        const { data: invitation, error: invitationError } = await supabase
          .from('chama_invitations')
          .select('chama_id')
          .eq('id', invitationId)
          .single<{ chama_id: string }>();

        if (invitationError) throw invitationError;
        if (!invitation) throw new Error("Invitation not found");

        await supabase
          .from('chama_members')
          .insert({
            chama_id: invitation.chama_id,
            user_id: user.id,
            role: 'member',
            status: 'active'
          });
      }

      await supabase
        .from('chama_invitations')
        .update({ status: accept ? 'accepted' : 'rejected' })
        .eq('id', invitationId);

      setInvitations(invitations.filter(i => i.id !== invitationId));
      toast({ title: "Success", description: `Invitation ${accept ? 'accepted' : 'rejected'}` });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({ variant: "destructive", title: "Error", description: error.message });
      }
    }
  };

  // Setup realtime updates
  const setupRealtime = (): RealtimeChannel | undefined => {
    if (!user) return;

    return supabase
      .channel('chama-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chama_members',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchUserChamas(user.id);
        fetchDiscoverChamas(user.id);
      })
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chama_invitations',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchInvitations(user.id);
      })
      .subscribe();
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="my">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="my">My Chamas</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
        </TabsList>

        {/* My Chamas Tab */}
        <TabsContent value="my" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">My Chamas</h2>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Chama
            </Button>
          </div>

          {showCreateForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create New Chama</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateChama} className="space-y-4">
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
                    className="w-full p-2 border rounded"
                    value={newChama.frequency}
                    onChange={(e) => setNewChama({...newChama, frequency: e.target.value})}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                  <Input
                    type="number"
                    placeholder="Target Amount (optional)"
                    value={newChama.target}
                    onChange={(e) => setNewChama({...newChama, target: e.target.value})}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Creating..." : "Create Chama"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {chamas.map(chama => (
              <Card key={chama.id}>
                <CardHeader>
                  <CardTitle>{chama.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {chama.members?.[0]?.count || 0} members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Contribution:</span>
                      <span className="font-medium">KSh {chama.contribution_amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Frequency:</span>
                      <span className="font-medium capitalize">{chama.frequency}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => router.push(`/chamas/${chama.id}`)}
                  >
                    View Chama
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Discover Tab */}
        <TabsContent value="discover" className="mt-6">
          <div className="space-y-4 mb-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter invitation code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
              />
              <Button onClick={handleJoinByCode}>Join with Code</Button>
            </div>
            <Input
              placeholder="Search chamas..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (user) fetchDiscoverChamas(user.id);
              }}
            />
          </div>

          {discoverChamas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No chamas found. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {discoverChamas.map(chama => (
                <Card key={chama.id}>
                  <CardHeader>
                    <CardTitle>{chama.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {chama.members?.[0]?.count || 0} members
                    </CardDescription>
                    <Badge variant={chama.is_public ? "default" : "secondary"}>
                      {chama.is_public ? "Public" : "Private"}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Contribution:</span>
                        <span className="font-medium">KSh {chama.contribution_amount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Frequency:</span>
                        <span className="font-medium capitalize">{chama.frequency}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={async () => {
                        await handleJoinChama(chama.id);
                        router.push(`/chamas/${chama.id}`);
                      }}
                    >
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
              <p className="text-muted-foreground">No pending invitations</p>
            </div>
          ) : (
            <div className="space-y-4">
              {invitations.map(invitation => (
                <Card key={invitation.id}>
                  <CardHeader>
                    <CardTitle>{invitation.chamas.name}</CardTitle>
                    <CardDescription>
                      Invited by: {invitation.invited_by?.username || "Admin"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Contribution:</span>
                      <span className="font-medium">KSh {invitation.chamas.contribution_amount}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={async () => await handleInvitationResponse(invitation.id, false)}
                    >
                      Decline
                    </Button>
                    <Button 
                      onClick={async () => {
                        await handleInvitationResponse(invitation.id, true);
                        router.push(`/chamas/${invitation.chamas.id}`);
                      }}
                    >
                      Accept
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}