import React, { useState, useCallback, useEffect } from 'react';
import { FileUploadZone } from './components/FileUploadZone';
import { FileList } from './components/FileList';
import { LanguageToggle } from './components/LanguageToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { HomeButton } from './components/HomeButton';
import { translations } from './i18n/translations';
import { FileItem } from './types';

function App() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFiles = (newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
      progress: 0,
      status: 'uploading'
    }));

    setFiles(prev => [...prev, ...fileItems]);

    fileItems.forEach(fileItem => {
      simulateFileUpload(fileItem.id);
    });
  };

  const simulateFileUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId ? { ...f, progress: 100, status: 'completed' } : f
          )
        );
      } else {
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId ? { ...f, progress } : f
          )
        );
      }
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const t = translations[lang];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800'
    } p-8 flex flex-col`}>
      <div className="fixed top-4 right-4 flex flex-col gap-2">
        <LanguageToggle currentLang={lang} onToggle={toggleLanguage} theme={theme} />
        <ThemeToggle currentTheme={theme} onToggle={toggleTheme} />
      </div>

      <div className="fixed top-4 left-4">
        <HomeButton theme={theme} lang={lang} />
      </div>
      
      <div className="max-w-4xl mx-auto flex-1 w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{t.subtitle}</p>
        </div>

        <FileUploadZone
          isDragging={isDragging}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onFileSelect={(files) => files && handleFiles(Array.from(files))}
          lang={lang}
          theme={theme}
        />

        <div className={`rounded-lg shadow-lg p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-xl font-semibold mb-4">{t.uploadedFiles}</h2>
          <FileList
            files={files}
            onRemove={removeFile}
            onDownload={downloadFile}
            lang={lang}
            theme={theme}
          />
        </div>
      </div>

      <footer className={`text-center mt-8 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {t.copyright}
      </footer>
    </div>
  );
}

export default App;