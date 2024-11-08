import React from 'react';
import { File, Download, X, CheckCircle, AlertCircle } from 'lucide-react';
import { translations } from '../i18n/translations';
import { FileItem } from '../types';

interface FileListProps {
  files: FileItem[];
  onRemove: (id: string) => void;
  onDownload: (file: File) => void;
  lang: 'en' | 'zh';
  theme: 'light' | 'dark';
}

export function FileList({ files, onRemove, onDownload, lang, theme }: FileListProps) {
  const t = translations[lang];

  if (files.length === 0) {
    return (
      <div className={`text-center py-8 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {t.noFiles}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {files.map((fileItem) => (
        <div
          key={fileItem.id}
          className={`flex items-center justify-between p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-4 flex-1">
            <File className={theme === 'dark' ? 'w-6 h-6 text-gray-300' : 'w-6 h-6 text-gray-500'} />
            <div className="flex-1">
              <p className={`font-medium ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>
                {fileItem.file.name}
              </p>
              <p className={theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                {(fileItem.file.size / 1024 / 1024).toFixed(2)} {t.mb}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {fileItem.status === 'uploading' && (
              <div className={`w-32 rounded-full h-2 ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
              }`}>
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${fileItem.progress}%` }}
                />
              </div>
            )}
            
            {fileItem.status === 'completed' && (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <button
                  onClick={() => onDownload(fileItem.file)}
                  className="text-blue-500 hover:text-blue-400"
                >
                  <Download className="w-5 h-5" />
                </button>
              </>
            )}

            {fileItem.status === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}

            <button
              onClick={() => onRemove(fileItem.id)}
              className={`transition-colors ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-red-400'
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}