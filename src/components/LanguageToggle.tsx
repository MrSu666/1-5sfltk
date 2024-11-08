import React from 'react';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  currentLang: 'en' | 'zh';
  onToggle: () => void;
  theme: 'light' | 'dark';
}

export function LanguageToggle({ currentLang, onToggle, theme }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md transition-colors ${
        theme === 'dark'
          ? 'bg-gray-800 hover:bg-gray-700 text-white'
          : 'bg-white/90 backdrop-blur-sm hover:bg-gray-50 text-gray-800'
      }`}
    >
      <Languages className="w-5 h-5" />
      <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
    </button>
  );
}