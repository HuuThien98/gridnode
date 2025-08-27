import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  DollarSign, 
  Activity, 
  MessageSquare,
  Download,
  Search,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPage() {
  const [maskApiKeys, setMaskApiKeys] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  // Mock data - in real app, this would come from your backend
  const mockUsers = [
    { id: '1', email: 'user1@example.com', role: 'user', isVerified: true, subscription_plan: 'pro', scans_used: 45, created_at: '2024-01-10' },
    { id: '2', email: 'user2@example.com', role: 'user', isVerified: false, subscription_plan: 'free', scans_used: 3, created_at: '2024-01-12' },
    { id: '3', email: 'enterprise@company.com', role: 'user', isVerified: true, subscription_plan: 'vip_b2b', scans_used: 1250, created_at: '2024-01-08' }
  ];

  const mockDeposits = [
    { id: '1', user_email: 'user1@example.com', amount: 29, currency: 'USDT', status: 'confirmed', plan: 'pro', created_at: '2024-01-15 10:30' },
    { id: '2', user_email: 'enterprise@company.com', amount: 4999, currency: 'USDT', status: 'confirmed', plan: 'vip_b2b', created_at: '2024-01-14 15:20' },
    { id: '3', user_email: 'user3@example.com', amount: 10, currency: 'USDT', status: 'pending', plan: 'starter', created_at: '2024-01-15 14:45' }
  ];

  const mockLogs = [
    { id: '1', user_email: 'user1@example.com', wallet_address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', risk_level: 'low', score: 15, timestamp: '2024-01-15 14:30' },
    { id: '2', user_email: 'enterprise@company.com', wallet_address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy', risk_level: 'medium', score: 65, timestamp: '2024-01-15 13:15' },
    { id: '3', user_email: 'user2@example.com', wallet_address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', risk_level: 'high', score: 85, timestamp: '2024-01-15 12:00' }
  ];

  const mockContacts = JSON.parse(localStorage.getItem('gridnode_contacts') || '[]');

  const stats = {
    totalUsers: mockUsers.length,
    totalDeposits: mockDeposits.reduce((sum, deposit) => sum + deposit.amount, 0),
    totalScans: mockLogs.length,
    pendingDeposits: mockDeposits.filter(d => d.status === 'pending').length
  };

  const exportToCSV = (data: Record<string, string | number | boolean>[], filename: string) => {
    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success(`${filename} exported successfully!`);
  };

  const handleUserAction = (action: string, userId: string) => {
    // Mock user actions
    toast.success(`User ${action} action executed for user ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">Overview</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-white/20">Users</TabsTrigger>
            <TabsTrigger value="finance" className="data-[state=active]:bg-white/20">Finance</TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-white/20">Logs</TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-white/20">Contacts</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white/20">Settings</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
                  <p className="text-xs text-white/50">Active accounts</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${stats.totalDeposits.toLocaleString()}</div>
                  <p className="text-xs text-white/50">All time deposits</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Total Scans</CardTitle>
                  <Activity className="h-4 w-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalScans}</div>
                  <p className="text-xs text-white/50">Risk checks performed</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/70">Pending Payments</CardTitle>
                  <MessageSquare className="h-4 w-4 text-white/50" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.pendingDeposits}</div>
                  <p className="text-xs text-white/50">Awaiting confirmation</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">User Management</CardTitle>
                    <CardDescription className="text-white/70">Manage user accounts and permissions</CardDescription>
                  </div>
                  <Button onClick={() => exportToCSV(mockUsers, 'users')} variant="outline" className="bg-white/10 border-white/20 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-white/50" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white/70">Email</TableHead>
                      <TableHead className="text-white/70">Role</TableHead>
                      <TableHead className="text-white/70">Verified</TableHead>
                      <TableHead className="text-white/70">Plan</TableHead>
                      <TableHead className="text-white/70">Scans Used</TableHead>
                      <TableHead className="text-white/70">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id} className="border-white/20">
                        <TableCell className="text-white">{user.email}</TableCell>
                        <TableCell>
                          <Badge className={user.role === 'admin' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={user.isVerified ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}>
                            {user.isVerified ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white capitalize">{user.subscription_plan}</TableCell>
                        <TableCell className="text-white">{user.scans_used}</TableCell>
                        <TableCell className="space-x-2">
                          <Button size="sm" variant="ghost" onClick={() => handleUserAction('edit', user.id)}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleUserAction('delete', user.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Finance */}
          <TabsContent value="finance" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Financial Overview</CardTitle>
                    <CardDescription className="text-white/70">Track deposits and payments</CardDescription>
                  </div>
                  <Button onClick={() => exportToCSV(mockDeposits, 'deposits')} variant="outline" className="bg-white/10 border-white/20 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white/70">User</TableHead>
                      <TableHead className="text-white/70">Amount</TableHead>
                      <TableHead className="text-white/70">Currency</TableHead>
                      <TableHead className="text-white/70">Plan</TableHead>
                      <TableHead className="text-white/70">Status</TableHead>
                      <TableHead className="text-white/70">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDeposits.map((deposit) => (
                      <TableRow key={deposit.id} className="border-white/20">
                        <TableCell className="text-white">{deposit.user_email}</TableCell>
                        <TableCell className="text-white font-mono">${deposit.amount}</TableCell>
                        <TableCell className="text-white">{deposit.currency}</TableCell>
                        <TableCell className="text-white capitalize">{deposit.plan}</TableCell>
                        <TableCell>
                          <Badge className={deposit.status === 'confirmed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}>
                            {deposit.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white/70">{deposit.created_at}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs */}
          <TabsContent value="logs" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Scan Logs</CardTitle>
                    <CardDescription className="text-white/70">All wallet risk analysis logs</CardDescription>
                  </div>
                  <Button onClick={() => exportToCSV(mockLogs, 'scan_logs')} variant="outline" className="bg-white/10 border-white/20 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-white/70">User</TableHead>
                      <TableHead className="text-white/70">Wallet Address</TableHead>
                      <TableHead className="text-white/70">Risk Level</TableHead>
                      <TableHead className="text-white/70">Score</TableHead>
                      <TableHead className="text-white/70">Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLogs.map((log) => (
                      <TableRow key={log.id} className="border-white/20">
                        <TableCell className="text-white">{log.user_email}</TableCell>
                        <TableCell className="text-white">
                          <code className="text-blue-300 bg-blue-900/20 px-2 py-1 rounded text-sm">
                            {log.wallet_address.slice(0, 12)}...{log.wallet_address.slice(-8)}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            log.risk_level === 'low' ? 'bg-green-500/20 text-green-300' :
                            log.risk_level === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }>
                            {log.risk_level.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white font-mono">{log.score}/100</TableCell>
                        <TableCell className="text-white/70">{log.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts */}
          <TabsContent value="contacts" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Contact Messages</CardTitle>
                <CardDescription className="text-white/70">Messages received from the contact form</CardDescription>
              </CardHeader>
              <CardContent>
                {mockContacts.length > 0 ? (
                  <div className="space-y-4">
                    {mockContacts.map((contact: { id: string; name: string; email: string; company?: string; message: string; timestamp: string }) => (
                      <Card key={contact.id} className="bg-white/5 border-white/10">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-white text-lg">{contact.name}</CardTitle>
                            <Badge className="bg-blue-500/20 text-blue-300">
                              {new Date(contact.timestamp).toLocaleDateString()}
                            </Badge>
                          </div>
                          <CardDescription className="text-white/70">
                            {contact.email} {contact.company && `• ${contact.company}`}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/80">{contact.message}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/70">No contact messages yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">API Settings</CardTitle>
                <CardDescription className="text-white/70">Configure API keys and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">Scorechain API Key</h4>
                      <p className="text-white/70 text-sm">API key for blockchain risk analysis</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMaskApiKeys(!maskApiKeys)}
                      className="text-white hover:bg-white/10"
                    >
                      {maskApiKeys ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border">
                    <code className="text-blue-300 text-sm">
                      {maskApiKeys ? '6ccf6f56-****-****-****-********4fdd' : '6ccf6f56-5570-429e-871c-e25bcd0c4fdd'}
                    </code>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">NOWPayments API Key</h4>
                      <p className="text-white/70 text-sm">API key for cryptocurrency payments</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border">
                    <code className="text-blue-300 text-sm">
                      {maskApiKeys ? 'HEMNJR5-****-****-****CEP5' : 'HEMNJR5-6MC48WZ-JCZY5F4-GS6CEP5'}
                    </code>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold">IPN Secret</h4>
                    <p className="text-white/70 text-sm">Secret key for payment notifications</p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border">
                    <code className="text-blue-300 text-sm">
                      {maskApiKeys ? 'nvUGq4aD****KxdRIn4fCpSyGSrgDpTrQh' : 'nvUGq4aDJ7KxdRIn4fCpSyGSrgDpTrQh'}
                    </code>
                  </div>
                </div>

                <Alert className="bg-yellow-500/20 border-yellow-500/50">
                  <AlertDescription className="text-white">
                    🔒 API keys are masked for security. Click the eye icon to toggle visibility.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}