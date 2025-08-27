import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Navigation } from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap, Globe, TrendingUp, Lock, Users } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    if (user) {
      navigate('/risk-check');
    } else {
      navigate('/login');
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Advanced Risk Analysis',
      description: 'AI-powered blockchain analysis to identify potential risks and fraud patterns'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Instant risk assessment for wallet addresses and transactions'
    },
    {
      icon: Globe,
      title: 'Multi-blockchain Support',
      description: 'Comprehensive coverage across major blockchain networks'
    },
    {
      icon: TrendingUp,
      title: 'Risk Scoring',
      description: 'Clear risk levels with detailed explanations and recommendations'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared with third parties'
    },
    {
      icon: Users,
      title: 'Enterprise Solutions',
      description: 'Scalable solutions for businesses and financial institutions'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <Button
            size="lg"
            onClick={handleStartAnalysis}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto"
          >
            {t('home.hero.cta')}
          </Button>
        </div>
        
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Why GridNode Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('home.why.title')}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive blockchain intelligence platform trusted by professionals worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('home.demo.title')}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              See how GridNode analyzes wallet addresses and provides comprehensive risk assessment
            </p>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-4xl mx-auto">
              <div className="bg-slate-900/50 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-2">$ gridnode analyze --address 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</div>
                <div className="text-white/80 mb-2">Analyzing wallet address...</div>
                <div className="text-white/80 mb-2">Checking transaction history...</div>
                <div className="text-white/80 mb-4">Generating risk assessment...</div>
                <div className="text-white">
                  <div className="text-green-400">✓ Risk Level: LOW</div>
                  <div className="text-blue-400">✓ Clean transaction history</div>
                  <div className="text-blue-400">✓ No suspicious activity detected</div>
                  <div className="text-blue-400">✓ High reputation score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-lg border-t border-white/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GN</span>
              </div>
              <span className="text-white font-bold text-xl">GridNode</span>
            </div>
            
            <div className="flex items-center space-x-6 text-white/60">
              <span>{t('footer.copyright')}</span>
              <button className="hover:text-white transition-colors">
                {t('footer.privacy')}
              </button>
              <button className="hover:text-white transition-colors">
                {t('footer.terms')}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}