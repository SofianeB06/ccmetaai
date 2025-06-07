import React, { useState, useEffect } from 'react';
import { URLItem } from './types';
import Header from './components/Header';
import URLInput from './components/URLInput';
import URLTable from './components/URLTable';
import ProcessingPanel from './components/ProcessingPanel';
import ResultsModal from './components/ResultsModal';
import { scrapeURL, extractMainContent } from './utils/scraper';
import { detectFramework } from './utils/frameworks';
import { generateSEOContent } from './utils/seoGenerator';
import { exportToCSV, downloadFile } from './utils/export';

function App() {
  const [urls, setUrls] = useState<URLItem[]>(() => {
    const stored = localStorage.getItem('urls');
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((item: any) => {
          if (
            item &&
            typeof item.id === 'string' &&
            typeof item.url === 'string' &&
            typeof item.status === 'string'
          ) {
            return {
              ...item,
              createdAt: item.createdAt ? new Date(item.createdAt) : new Date()
            } as URLItem;
          }
          return null;
        })
        .filter(Boolean) as URLItem[];
    } catch {
      return [];
    }
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<URLItem | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Persist URLs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('urls', JSON.stringify(urls));
  }, [urls]);

  const addURLs = (newUrls: string[]) => {
    const urlItems: URLItem[] = newUrls.map(url => ({
      id: crypto.randomUUID(),
      url,
      status: 'pending',
      createdAt: new Date()
    }));
    
    setUrls(prev => [...prev, ...urlItems]);
  };

  const deleteURL = (id: string) => {
    setUrls(prev => prev.filter(url => url.id !== id));
  };

  const resetAll = () => {
    if (isProcessing) return;
    setUrls([]);
  };

  const processURL = async (urlItem: URLItem): Promise<URLItem> => {
    try {
      // Update status to processing
      setUrls(prev => prev.map(u => 
        u.id === urlItem.id ? { ...u, status: 'processing' } : u
      ));

      // Scrape content
      const htmlContent = await scrapeURL(urlItem.url);
      const textContent = extractMainContent(htmlContent);
      
      // Detect framework
      const framework = detectFramework(textContent);
      
      // Generate SEO content
      const { titles, metaDescriptions } = generateSEOContent(textContent, framework);
      
      return {
        ...urlItem,
        status: 'completed',
        framework,
        titles,
        metaDescriptions,
        content: textContent
      };
    } catch (error) {
      return {
        ...urlItem,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const startProcessing = async () => {
    const pendingUrls = urls.filter(url => url.status === 'pending');
    if (pendingUrls.length === 0) return;

    setIsProcessing(true);

    // Process URLs in batches to avoid overwhelming the system
    const batchSize = 3;
    for (let i = 0; i < pendingUrls.length && isProcessing; i += batchSize) {
      const batch = pendingUrls.slice(i, i + batchSize);
      
      // Process batch in parallel
      const processedBatch = await Promise.all(
        batch.map(url => processURL(url))
      );

      // Update URLs with results
      setUrls(prev => prev.map(url => {
        const processed = processedBatch.find(p => p.id === url.id);
        return processed || url;
      }));

      // Small delay between batches
      if (i + batchSize < pendingUrls.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setIsProcessing(false);
  };

  const pauseProcessing = () => {
    setIsProcessing(false);
  };

  const exportResults = () => {
    const completedUrls = urls.filter(url => url.status === 'completed');
    if (completedUrls.length === 0) return;

    const csvContent = exportToCSV(completedUrls);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    downloadFile(csvContent, `ccmeta-results-${timestamp}.csv`, 'text/csv');
  };

  const viewResults = (url: URLItem) => {
    setSelectedUrl(url);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <URLInput onAddURLs={addURLs} isProcessing={isProcessing} />
        
        <ProcessingPanel
          urls={urls}
          isProcessing={isProcessing}
          onStartProcessing={startProcessing}
          onPauseProcessing={pauseProcessing}
          onResetAll={resetAll}
          onExport={exportResults}
        />
        
        <URLTable
          urls={urls}
          onViewResults={viewResults}
          onDeleteURL={deleteURL}
        />
      </main>

      <ResultsModal
        url={selectedUrl}
        onClose={() => setSelectedUrl(null)}
      />
    </div>
  );
}

export default App;
