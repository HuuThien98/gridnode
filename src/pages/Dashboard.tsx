import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  TrendingUp, 
  Shield, 
  CreditCard, 
  Calendar,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  XCircle 
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Mock recent checks data
  const recentChecks = [
    {
      id: '1',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      riskLevel: 'low',
      score: 15,
      timestamp: '2024-01-15 14:30:00',
    },
    {
      id: '2', 
      address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      riskLevel: 'medium',
      score: 65,
      timestamp: '2024-01-15 13:15:00',
    },
    {
      id: '3',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      riskLevel: 'high',
      score: 85,
      timestamp: '2024-01-15 12:00:00',
    }
  ];

  const getPlanLimits = () => {
    const planLimits = {
      free: 5,
      starter: 300,
      pro: 2000,
      vip1: 5000,
      vip_b2b: 100000,
      unlimited: Infinity
    };
    
    return planLimits[user?.subscription_plan || 'free'];
  };

  const getScansRemaining = () => {
    const limit = getPlanLimits();
    if (limit === Infinity) return Infinity;
    return Math.max(0, limit - (user?.scans_used || 0));
  };

  const getUsagePercentage = () => {
    const limit = getPlanLimits();
    if (limit === Infinity) return 0;
    return ((user?.scans_used || 0) / limit) * 100;
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'high': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const isSubscriptionActive = () => {
    if (!user?.subscription_expiry) return false;
    return new Date(user.subscription_expiry) > new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {t('dashboard.title')}
          </h1>
          <p className="text-white/70">
            Welcome back, {user?.email}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Plan */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                {t('dashboard.activePlan')}
              </CardTitle>
              <CreditCard className="h-4 w-4 text-white/50" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white capitalize">
                {user?.subscription_plan || 'Free'}
              </div>
              <p className="text-xs text-white/50">
                {isSubscriptionActive() 
                  ? `Expires: ${new Date(user?.subscription_expiry || '').toLocaleDateString()}`
                  : 'No expiration'
                }
              </p>
            </CardContent>
          </Card>

          {/* Remaining Scans */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                {t('dashboard.remainingScans')}
              </CardTitle>
              <Shield className="h-4 w-4 text-white/50" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {getScansRemaining() === Infinity ? '∞' : getScansRemaining()}
              </div>
              <p className="text-xs text-white/50">
                Used: {user?.scans_used || 0} / {getPlanLimits() === Infinity ? '∞' : getPlanLimits()}
              </p>
            </CardContent>
          </Card>

          {/* This Month Usage */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                Usage This Month
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-white/50" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {Math.round(getUsagePercentage())}%
              </div>
              <Progress value={getUsagePercentage()} className="mt-2" />
            </CardContent>
          </Card>

          {/* Total Checks */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                Total Checks
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-white/50" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {user?.scans_used || 0}
              </div>
              <p className="text-xs text-white/50">
                All time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Checks */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white">{t('dashboard.recentChecks')}</CardTitle>
            <CardDescription className="text-white/70">
              Your latest wallet risk analyses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-white/70">Address</TableHead>
                  <TableHead className="text-white/70">Risk Level</TableHead>
                  <TableHead className="text-white/70">Score</TableHead>
                  <TableHead className="text-white/70">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentChecks.map((check) => (
                  <TableRow key={check.id} className="border-white/20">
                    <TableCell className="text-white">
                      <code className="text-blue-300 bg-blue-900/20 px-2 py-1 rounded text-sm">
                        {check.address.slice(0, 12)}...{check.address.slice(-8)}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(check.riskLevel)}>
                        <div className="flex items-center gap-1">
                          {getRiskIcon(check.riskLevel)}
                          {check.riskLevel.toUpperCase()}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white font-mono">
                      {check.score}/100
                    </TableCell>
                    <TableCell className="text-white/70">
                      {new Date(check.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-white/70">
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => navigate('/risk-check')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Shield className="w-4 h-4 mr-2" />
                New Risk Check
              </Button>
              
              <Button
                onClick={() => navigate('/pricing')}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {t('dashboard.upgradePlan')}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Account Status</CardTitle>
              <CardDescription className="text-white/70">
                Your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Email Verified</span>
                <Badge className={user?.isVerified ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                  {user?.isVerified ? 'Verified' : 'Unverified'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/70">Account Type</span>
                <Badge className="bg-blue-500/20 text-blue-300">
                  {user?.role?.toUpperCase()}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/70">Member Since</span>
                <span className="text-white">January 2024</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}