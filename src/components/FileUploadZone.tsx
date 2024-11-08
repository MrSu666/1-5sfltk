import React from 'react';
import { Upload } from 'lucide-react';
import { translations } from '../i18n/translations';

interface FileUploadZoneProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (files: FileList | null) => void;
  lang: 'en' | 'zh';
  theme: 'light' | 'dark';
}

export function FileUploadZone({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  lang,
  theme
}: FileUploadZoneProps) {
  const t = translations[lang];

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 mb-8 transition-all ${
        isDragging
          ? 'border-blue-500 bg-blue-500/10'
          : theme === 'dark'
          ? 'border-gray-600 bg-gray-800'
          : 'border-gray-300 bg-white'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="text-center">
        <Upload className={`w-12 h-12 mx-auto mb-4 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
        }`} />
        <p className={theme === 'dark' ? 'text-gray-300 mb-2' : 'text-gray-600 mb-2'}>
          {t.dragDropText}{' '}
          <label className="text-blue-500 hover:text-blue-400 cursor-pointer">
            {t.browse}
            <input
              type="file"
              className="hidden"
              multiple
              onChange={(e) => onFileSelect(e.target.files)}
            />
          </label>
        </p>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {t.supportText}
        </p>
      </div>
    </div>
  );
}