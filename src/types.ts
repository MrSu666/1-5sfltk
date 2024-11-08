export interface FileItem {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}