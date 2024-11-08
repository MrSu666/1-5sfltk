import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { translations } from '../i18n/translations';

interface ThemeToggleProps {
  currentTheme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ currentTheme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md transition-colors ${
        currentTheme === 'dark'
          ? 'bg-gray-800 hover:bg-gray-700 text-white'
          : 'bg-white/90 backdrop-blur-sm hover:bg-gray-50 text-gray-800'
      }`}
    >
      {currentTheme === 'dark' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
      <span className="text-sm font-medium">
        {currentTheme === 'dark' ? '夜间' : '日间'}
      </span>
    </button>
  );
}