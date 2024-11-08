import React from 'react';
import { Home } from 'lucide-react';
import { translations } from '../i18n/translations';

interface HomeButtonProps {
  theme: 'light' | 'dark';
  lang: 'en' | 'zh';
}

export function HomeButton({ theme, lang }: HomeButtonProps) {
  const t = translations[lang];
  
  return (
    <a
      href="https://su-mywebsite.cn/"
      className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md transition-colors ${
        theme === 'dark'
          ? 'bg-gray-800 hover:bg-gray-700 text-white'
          : 'bg-white/90 backdrop-blur-sm hover:bg-gray-50 text-gray-800'
      }`}
    >
      <Home className="w-5 h-5" />
      <span className="text-sm font-medium">{t.home}</span>
    </a>
  );
}