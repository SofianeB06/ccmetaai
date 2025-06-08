import { URLItem } from '../types';

export const exportToCSV = (data: URLItem[]): string => {
  const headers = [
    'URL',
    'Status',
    'Framework',
    'Framework Justification',
    'Title 1',
    'Title 2', 
    'Title 3',
    'Meta Description 1',
    'Meta Description 2',
    'Meta Description 3',
    'Error'
  ];
  
  const rows = data.map(item => [
    item.url,
    item.status,
    item.framework?.name || '',
    item.framework?.justification || '',
    item.titles?.[0] || '',
    item.titles?.[1] || '',
    item.titles?.[2] || '',
    item.metaDescriptions?.[0] || '',
    item.metaDescriptions?.[1] || '',
    item.metaDescriptions?.[2] || '',
    item.error || ''
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
    
  return csvContent;
};

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const parseCSV = (csvText: string): string[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  const urls: string[] = [];
  
  lines.forEach(line => {
    // Simple CSV parsing - in production, use a proper CSV parser
    const cells = line.split(',').map(cell => cell.replace(/"/g, '').trim());
    cells.forEach(cell => {
      if (cell.startsWith('http')) {
        urls.push(cell);
      }
    });
  });
  
  return [...new Set(urls)]; // Remove duplicates
};

export const saveContentAsTxt = (url: string, content: string) => {
  const sanitized = url
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  downloadFile(content, `${sanitized || 'page'}.txt`, 'text/plain');
};
