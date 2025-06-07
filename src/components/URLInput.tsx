import React, { useState, useRef } from 'react';
import { Upload, Plus, FileText, X } from 'lucide-react';
import { parseCSV, validateURL } from '../utils/export';

interface URLInputProps {
  onAddURLs: (urls: string[]) => void;
  isProcessing: boolean;
}

const URLInput: React.FC<URLInputProps> = ({ onAddURLs, isProcessing }) => {
  const [manualUrl, setManualUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleManualAdd = () => {
    if (!manualUrl.trim()) return;
    
    if (!validateURL(manualUrl)) {
      setError('URL invalide. Veuillez entrer une URL complète (ex: https://example.com)');
      return;
    }
    
    onAddURLs([manualUrl]);
    setManualUrl('');
    setError('');
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const urls = parseCSV(content);
        
        if (urls.length === 0) {
          setError('Aucune URL trouvée dans le fichier');
          return;
        }
        
        const validUrls = urls.filter(validateURL);
        if (validUrls.length === 0) {
          setError('Aucune URL valide trouvée dans le fichier');
          return;
        }
        
        onAddURLs(validUrls);
        setError('');
      } catch (err) {
        setError('Erreur lors de la lecture du fichier');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => 
      file.type === 'text/csv' || 
      file.name.endsWith('.csv') || 
      file.name.endsWith('.txt')
    );
    
    if (csvFile) {
      handleFileUpload(csvFile);
    } else {
      setError('Veuillez déposer un fichier CSV ou TXT');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Import des URLs
      </h2>
      
      {/* Manual URL Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ajouter une URL manuellement
        </label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            disabled={isProcessing}
            onKeyPress={(e) => e.key === 'Enter' && handleManualAdd()}
          />
          <button
            onClick={handleManualAdd}
            disabled={isProcessing || !manualUrl.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>

      {/* File Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Importer depuis un fichier
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Glissez votre fichier CSV ici ou
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
          >
            parcourir les fichiers
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            className="hidden"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Formats supportés: CSV, TXT
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start space-x-2">
          <X className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLInput;