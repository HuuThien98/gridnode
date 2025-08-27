import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Navigation } from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, Star, Building, Zap, Copy, QrCode, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface Plan {
  id: string;
  name: string;
  price: number;
  scans: number | string;
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
}

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<{
    payment_id: string;
    payment_status: string;
    pay_address: string;
    pay_amount: number;
    pay_currency: string;
    qr_code: string;
    created_at: string;
    order_id: string;
  } | null>(null);
  
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const networkOptions = [
    { value: 'usdttrc20', label: 'USDT TRC20 (Tron)', warning: 'TRC20 (Tron)' },
    { value: 'usdtbsc', label: 'USDT BEP20 (BSC)', warning: 'BEP20 (Binance Smart Chain)' }
  ];

  const plans: Plan[] = [
    {
      id: 'free',
      name: t('pricing.free'),
      price: 0,
      scans: 5,
      features: [
        'Basic risk analysis',
        'Email support',
        'Standard reporting'
      ]
    },
    {
      id: 'starter',
      name: t('pricing.starter'),
      price: 10,
      scans: 300,
      features: [
        'Advanced risk analysis',
        'Priority email support',
        'Detailed reporting',
        'API access'
      ]
    },
    {
      id: 'pro',
      name: t('pricing.pro'),
      price: 29,
      scans: 2000,
      popular: true,
      features: [
        'Premium risk analysis',
        '24/7 chat support',
        'Advanced reporting',
        'Full API access',
        'Custom alerts'
      ]
    },
    {
      id: 'vip1',
      name: t('pricing.vip1'),
      price: 99,
      scans: 5000,
      features: [
        'Enterprise risk analysis',
        'Dedicated support',
        'Custom reporting',
        'Full API access',
        'Real-time monitoring',
        'Custom integrations'
      ]
    },
    {
      id: 'vip_b2b',
      name: t('pricing.vipB2B'),
      price: 4999,
      scans: 100000,
      enterprise: true,
      features: [
        'Enterprise-grade analysis',
        'Dedicated account manager',
        'Custom solutions',
        'Dedicated API',
        'SLA guarantee',
        'On-premise deployment'
      ]
    },
    {
      id: 'unlimited',
      name: t('pricing.unlimited'),
      price: 9999,
      scans: 'Unlimited',
      enterprise: true,
      features: [
        'Unlimited risk analysis',
        'White-label solution',
        'Custom development',
        'Priority support',
        'Advanced analytics',
        'Full customization'
      ]
    }
  ];

  const handleGetStarted = async (plan: Plan) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (plan.price === 0) {
      toast.success('You are already on the free plan!');
      return;
    }

    setSelectedPlan(plan);
    setPaymentModal(true);
    setSelectedNetwork('');
    setPaymentInfo(null);
  };

  const createPaymentInvoice = async () => {
    if (!selectedPlan || !selectedNetwork) return;

    setLoadingPayment(true);
    
    try {
      // In real implementation, this would call NOWPayments API
      // const response = await fetch('https://api.nowpayments.io/v1/invoice', {
      //   method: 'POST',
      //   headers: {
      //     'x-api-key': 'HEMNJR5-6MC48WZ-JCZY5F4-GS6CEP5',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     price_amount: selectedPlan.price,
      //     price_currency: 'USD',
      //     pay_currency: selectedNetwork,
      //     order_id: 'order_' + Date.now(),
      //     order_description: `GridNode ${selectedPlan.name} Plan Subscription`
      //   })
      // });
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockPaymentInfo = {
        payment_id: 'mock_' + Date.now(),
        payment_status: 'waiting',
        pay_address: selectedNetwork === 'usdttrc20' 
          ? 'TQn9Y2khEsLMWD2fhes17SB4SJ6VpzhGfZ' 
          : '0x742d35Cc5C6aF0f8C44cfb9c9B4A089b4c73704',
        pay_amount: selectedPlan.price,
        pay_currency: selectedNetwork,
        qr_code: `data:image/svg+xml;base64,${btoa('<svg>QR Code</svg>')}`,
        created_at: new Date().toISOString(),
        order_id: 'order_' + Date.now()
      };
      
      setPaymentInfo(mockPaymentInfo);
      toast.success('Payment invoice created successfully!');
    } catch (error) {
      toast.error('Failed to create payment invoice. Please try again.');
    } finally {
      setLoadingPayment(false);
    }
  };

  const copyAddress = () => {
    if (paymentInfo?.pay_address) {
      navigator.clipboard.writeText(paymentInfo.pay_address);
      toast.success('Address copied to clipboard!');
    }
  };

  const getNetworkWarning = () => {
    const network = networkOptions.find(n => n.value === selectedNetwork);
    return network ? network.warning : '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Flexible pricing plans to suit your blockchain analysis needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-500/50' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              {plan.enterprise && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600">
                  <Building className="w-3 h-3 mr-1" />
                  Enterprise
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-white">
                    ${plan.price}
                    {plan.price > 0 && <span className="text-lg text-white/60">/month</span>}
                  </div>
                  <CardDescription className="text-white/70">
                    {typeof plan.scans === 'number' ? plan.scans : plan.scans} {t('pricing.scansPerMonth')}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/80">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleGetStarted(plan)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  } ${plan.price === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={plan.price === 0 && user?.subscription_plan === 'free'}
                >
                  {plan.price === 0 && user?.subscription_plan === 'free' 
                    ? 'Current Plan' 
                    : t('pricing.getStarted')
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">How does billing work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  All plans are billed monthly. You can upgrade or downgrade at any time, and changes take effect immediately.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  We accept USDT (TRC20) and USDT (BSC) payments through NOWPayments for secure and fast transactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={paymentModal} onOpenChange={setPaymentModal}>
        <DialogContent className="bg-slate-900 border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Complete Payment
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Subscribe to {selectedPlan?.name} plan for ${selectedPlan?.price}/month
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {!paymentInfo && (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white">Select Network</label>
                  <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Choose payment network" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {networkOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-white">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Alert className="bg-yellow-500/20 border-yellow-500/50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-white">
                    Minimum deposit: 5 USDT
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={createPaymentInvoice}
                  disabled={!selectedNetwork || loadingPayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loadingPayment ? 'Creating Invoice...' : 'Create Payment Invoice'}
                </Button>
              </>
            )}

            {paymentInfo && (
              <div className="space-y-6">
                <Alert className="bg-red-500/20 border-red-500/50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-white font-medium">
                    ⚠️ Please send only USDT via {getNetworkWarning()}. Sending through another network may result in permanent loss of funds.
                  </AlertDescription>
                </Alert>

                <div className="text-center space-y-4">
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <QrCode className="w-32 h-32 text-slate-900" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-white/70">Send exactly:</p>
                    <p className="text-2xl font-bold text-green-400">
                      {paymentInfo.pay_amount} USDT
                    </p>
                    <p className="text-sm text-white/60">
                      Network: {networkOptions.find(n => n.value === paymentInfo.pay_currency)?.label}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-white/70">To address:</p>
                    <div className="flex items-center gap-2 bg-slate-800 p-3 rounded">
                      <code className="text-blue-300 text-sm flex-1 break-all">
                        {paymentInfo.pay_address}
                      </code>
                      <Button size="sm" variant="ghost" onClick={copyAddress}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-white/60">
                  <p>Payment will be confirmed automatically</p>
                  <p>Processing time: 1-5 minutes</p>
                  <p className="text-xs mt-2 text-white/40">
                    Order ID: {paymentInfo.order_id}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}