import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.riskCheck': 'Risk Check',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    
    // Home page
    'home.hero.title': 'GridNode – Crypto Wallet Risk Intelligence',
    'home.hero.subtitle': 'Advanced blockchain analytics and risk assessment for your crypto transactions',
    'home.hero.cta': 'Start Risk Analysis',
    'home.why.title': 'Why GridNode?',
    'home.features.title': 'Features',
    'home.demo.title': 'Demo',
    
    // Common
    'common.loading': 'Loading...',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.loginWithGoogle': 'Login with Google',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.alreadyHaveAccount': 'Already have an account?',
    
    // Risk Check
    'risk.title': 'Wallet Risk Analysis',
    'risk.inputPlaceholder': 'Enter wallet address',
    'risk.analyze': 'Analyze Risk',
    'risk.low': 'Low Risk',
    'risk.medium': 'Medium Risk',
    'risk.high': 'High Risk',
    
    // Pricing
    'pricing.title': 'Choose Your Plan',
    'pricing.free': 'Free',
    'pricing.starter': 'Starter',
    'pricing.pro': 'Pro',
    'pricing.vip1': 'VIP 1',
    'pricing.vipB2B': 'VIP B2B',
    'pricing.unlimited': 'Unlimited',
    'pricing.getStarted': 'Get Started',
    'pricing.scansPerMonth': 'scans/month',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.activePlan': 'Active Plan',
    'dashboard.remainingScans': 'Remaining Scans',
    'dashboard.recentChecks': 'Recent Checks',
    'dashboard.upgradePlan': 'Upgrade Plan',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.name': 'Name',
    'contact.company': 'Company',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.info': 'Contact Information',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.office': 'Office',
    'contact.hours': 'Business Hours',
    
    // Footer
    'footer.copyright': '© GridNode 2025',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service'
  },
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.riskCheck': 'Kiểm tra rủi ro',
    'nav.pricing': 'Bảng giá',
    'nav.contact': 'Liên hệ',
    'nav.dashboard': 'Bảng điều khiển',
    'nav.admin': 'Quản trị',
    'nav.login': 'Đăng nhập',
    'nav.signup': 'Đăng ký',
    'nav.logout': 'Đăng xuất',
    
    // Home page
    'home.hero.title': 'GridNode – Nền tảng phân tích rủi ro ví tiền điện tử',
    'home.hero.subtitle': 'Phân tích blockchain tiên tiến và đánh giá rủi ro cho các giao dịch crypto của bạn',
    'home.hero.cta': 'Bắt đầu phân tích rủi ro',
    'home.why.title': 'Tại sao chọn GridNode?',
    'home.features.title': 'Tính năng',
    'home.demo.title': 'Demo',
    
    // Common
    'common.loading': 'Đang tải...',
    'common.submit': 'Gửi',
    'common.cancel': 'Hủy',
    'common.save': 'Lưu',
    'common.delete': 'Xóa',
    'common.edit': 'Sửa',
    'common.view': 'Xem',
    'common.back': 'Quay lại',
    'common.next': 'Tiếp theo',
    'common.previous': 'Trước',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Mật khẩu',
    'auth.login': 'Đăng nhập',
    'auth.signup': 'Đăng ký',
    'auth.loginWithGoogle': 'Đăng nhập với Google',
    'auth.dontHaveAccount': 'Chưa có tài khoản?',
    'auth.alreadyHaveAccount': 'Đã có tài khoản?',
    
    // Risk Check
    'risk.title': 'Phân tích rủi ro ví',
    'risk.inputPlaceholder': 'Nhập địa chỉ ví',
    'risk.analyze': 'Phân tích rủi ro',
    'risk.low': 'Rủi ro thấp',
    'risk.medium': 'Rủi ro trung bình',
    'risk.high': 'Rủi ro cao',
    
    // Pricing
    'pricing.title': 'Chọn gói của bạn',
    'pricing.free': 'Miễn phí',
    'pricing.starter': 'Khởi đầu',
    'pricing.pro': 'Chuyên nghiệp',
    'pricing.vip1': 'VIP 1',
    'pricing.vipB2B': 'VIP B2B',
    'pricing.unlimited': 'Không giới hạn',
    'pricing.getStarted': 'Bắt đầu',
    'pricing.scansPerMonth': 'lần quét/tháng',
    
    // Dashboard
    'dashboard.title': 'Bảng điều khiển',
    'dashboard.activePlan': 'Gói hiện tại',
    'dashboard.remainingScans': 'Lần quét còn lại',
    'dashboard.recentChecks': 'Kiểm tra gần đây',
    'dashboard.upgradePlan': 'Nâng cấp gói',
    
    // Contact
    'contact.title': 'Liên hệ với chúng tôi',
    'contact.name': 'Tên',
    'contact.company': 'Công ty',
    'contact.message': 'Tin nhắn',
    'contact.send': 'Gửi tin nhắn',
    'contact.info': 'Thông tin liên hệ',
    'contact.email': 'Email',
    'contact.phone': 'Điện thoại',
    'contact.office': 'Văn phòng',
    'contact.hours': 'Giờ làm việc',
    
    // Footer
    'footer.copyright': '© GridNode 2025',
    'footer.privacy': 'Chính sách bảo mật',
    'footer.terms': 'Điều khoản dịch vụ'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};