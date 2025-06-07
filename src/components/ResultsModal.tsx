import React from 'react';
import { URLItem } from '../types';
import { X, Copy, CheckCircle } from 'lucide-react';
import { validateSEOContent } from '../utils/seoGenerator';

interface ResultsModalProps {
  url: URLItem | null;
  onClose: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({ url, onClose }) => {
  const [copiedItems, setCopiedItems] = React.useState<Set<string>>(new Set());

  if (!url) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItems(prev => new Set(prev).add(id));
    setTimeout(() => {
      setCopiedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 2000);
  };

  const renderContentSection = (title: string, items: string[], type: 'title' | 'meta') => (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{title}</h4>
      <div className="space-y-3">
        {items.map((item, index) => {
          const validation = validateSEOContent(item, item);
          const length = type === 'title' ? validation.titleLength : validation.metaLength;
          const isValid = type === 'title' ? validation.titleValid : validation.metaValid;
          const maxLength = type === 'title' ? 65 : 155;
          const copyId = `${type}-${index}`;
          
          return (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Option {index + 1}
                </span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isValid 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {length}/{maxLength}
                  </span>
                  <button
                    onClick={() => copyToClipboard(item, copyId)}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {copiedItems.has(copyId) ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-gray-900 dark:text-white text-sm leading-relaxed">
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Résultats SEO générés
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 break-all">
              {url.url}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Framework Detection */}
          {url.framework && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${url.framework.color}`}>
                  {url.framework.name}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Framework détecté
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Justification:</strong> {url.framework.justification}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {url.framework.description}
              </p>
            </div>
          )}

          {/* Generated Titles */}
          {url.titles && renderContentSection('Titres générés', url.titles, 'title')}

          {/* Generated Meta Descriptions */}
          {url.metaDescriptions && renderContentSection('Meta descriptions générées', url.metaDescriptions, 'meta')}

          {/* Error Display */}
          {url.error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Erreur</h4>
              <p className="text-sm text-red-700 dark:text-red-300">{url.error}</p>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;