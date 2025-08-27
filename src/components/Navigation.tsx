import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, User, LogOut, Shield } from 'lucide-react';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GN</span>
            </div>
            <span className="text-white font-bold text-xl">GridNode</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-white/80 hover:text-white transition-colors ${
                isActive('/') ? 'text-white font-semibold' : ''
              }`}
            >
              {t('nav.home')}
            </Link>
            
            {user && (
              <Link
                to="/risk-check"
                className={`text-white/80 hover:text-white transition-colors ${
                  isActive('/risk-check') ? 'text-white font-semibold' : ''
                }`}
              >
                {t('nav.riskCheck')}
              </Link>
            )}
            
            <Link
              to="/pricing"
              className={`text-white/80 hover:text-white transition-colors ${
                isActive('/pricing') ? 'text-white font-semibold' : ''
              }`}
            >
              {t('nav.pricing')}
            </Link>
            
            <Link
              to="/contact"
              className={`text-white/80 hover:text-white transition-colors ${
                isActive('/contact') ? 'text-white font-semibold' : ''
              }`}
            >
              {t('nav.contact')}
            </Link>

            {user && (
              <Link
                to="/dashboard"
                className={`text-white/80 hover:text-white transition-colors ${
                  isActive('/dashboard') ? 'text-white font-semibold' : ''
                }`}
              >
                {t('nav.dashboard')}
              </Link>
            )}

            {user && user.role === 'admin' && (
              <Link
                to="/admin"
                className={`text-white/80 hover:text-white transition-colors flex items-center space-x-1 ${
                  isActive('/admin') ? 'text-white font-semibold' : ''
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{t('nav.admin')}</span>
              </Link>
            )}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Globe className="w-4 h-4 mr-2" />
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('vi')}>
                  Tiếng Việt
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <User className="w-4 h-4 mr-2" />
                    {user.email}
                    {user.role === 'admin' && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Admin
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    {t('nav.dashboard')}
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      {t('nav.admin')}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="text-white hover:bg-white/10"
                >
                  {t('nav.login')}
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {t('nav.signup')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};