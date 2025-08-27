import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Navigation } from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Shield, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface RiskResult {
  address: string;
  riskLevel: 'low' | 'medium' | 'high';
  score: number;
  reasons: string[];
  timestamp: string;
}

export default function RiskCheckPage() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);
  
  const { user } = useAuth();
  const { t } = useLanguage();

  const getScansRemaining = () => {
    if (!user) return 0;
    
    const planLimits = {
      free: 5,
      starter: 300,
      pro: 2000,
      vip1: 5000,
      vip_b2b: 100000,
      unlimited: Infinity
    };
    
    const limit = planLimits[user.subscription_plan];
    return limit === Infinity ? Infinity : Math.max(0, limit - user.scans_used);
  };

  const canPerformScan = () => {
    const remaining = getScansRemaining();
    return remaining > 0;
  };

  const handleAnalyze = async () => {
    if (!address.trim()) {
      toast.error('Please enter a wallet address');
      return;
    }

    if (!canPerformScan()) {
      toast.error('You have reached your scan limit. Please upgrade your plan.');
      return;
    }

    setLoading(true);

    try {
      // Mock API call to Scorechain API
      // In real implementation, this would call:
      // const response = await fetch(`https://api.scorechain.com/v1/analysis/${address}`, {
      //   headers: { 'Authorization': 'Bearer 6ccf6f56-5570-429e-871c-e25bcd0c4fdd' }
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock risk analysis result
      const mockResults: RiskResult[] = [
        {
          address,
          riskLevel: 'low',
          score: 15,
          reasons: ['Clean transaction history', 'No suspicious activity detected', 'High reputation score'],
          timestamp: new Date().toISOString()
        },
        {
          address,
          riskLevel: 'medium',
          score: 55,
          reasons: ['Mixed funds detected', 'Some transactions flagged', 'Moderate risk indicators'],
          timestamp: new Date().toISOString()
        },
        {
          address,
          riskLevel: 'high',
          score: 85,
          reasons: ['Linked to suspicious activity', 'High-risk transaction patterns', 'Flagged by multiple sources'],
          timestamp: new Date().toISOString()
        }
      ];

      // Random result for demo
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      
      // Update user's scan count (in real app, this would be done server-side)
      if (user) {
        const updatedUser = { ...user, scans_used: user.scans_used + 1 };
        localStorage.setItem('gridnode_user', JSON.stringify(updatedUser));
      }
      
      toast.success('Risk analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze wallet address');
    } finally {
      setLoading(false);
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'high': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Shield className="w-5 h-5" />;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t('risk.title')}
          </h1>
          <p className="text-xl text-white/80">
            Advanced blockchain analytics to assess wallet address risk levels
          </p>
        </div>

        {/* Scan Limit Info */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Scans Remaining</h3>
                <p className="text-white/70 text-sm">
                  Plan: {user?.subscription_plan?.toUpperCase() || 'FREE'}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {getScansRemaining() === Infinity ? '∞' : getScansRemaining()}
                </div>
                <p className="text-white/70 text-sm">
                  Used: {user?.scans_used || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Form */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Wallet Address Analysis
            </CardTitle>
            <CardDescription className="text-white/70">
              Enter a cryptocurrency wallet address to analyze its risk profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t('risk.inputPlaceholder')}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={loading || !canPerformScan()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? 'Analyzing...' : t('risk.analyze')}
              </Button>
            </div>
            
            {!canPerformScan() && (
              <Alert className="bg-red-500/20 border-red-500/50">
                <AlertDescription className="text-white">
                  You have reached your scan limit. Please upgrade your plan to continue.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                <p className="text-white">Analyzing blockchain data...</p>
                <Progress value={33} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && !loading && (
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {getRiskIcon(result.riskLevel)}
                Risk Analysis Result
              </CardTitle>
              <CardDescription className="text-white/70">
                Analysis completed at {new Date(result.timestamp).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Wallet Address:</span>
                  <code className="text-blue-300 bg-blue-900/20 px-2 py-1 rounded text-sm">
                    {result.address.slice(0, 12)}...{result.address.slice(-8)}
                  </code>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Risk Level:</span>
                  <Badge className={getRiskColor(result.riskLevel)}>
                    {result.riskLevel.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Risk Score:</span>
                  <span className="text-white font-bold">{result.score}/100</span>
                </div>
                
                <div className="space-y-2">
                  <span className="text-white font-medium">Analysis Details:</span>
                  <ul className="space-y-1">
                    {result.reasons.map((reason, index) => (
                      <li key={index} className="text-white/70 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}