import React from 'react';
import { URLItem } from '../types';
import { Play, Pause, RotateCcw, Download } from 'lucide-react';

interface ProcessingPanelProps {
  urls: URLItem[];
  isProcessing: boolean;
  onStartProcessing: () => void;
  onPauseProcessing: () => void;
  onResetAll: () => void;
  onExport: () => void;
}

const ProcessingPanel: React.FC<ProcessingPanelProps> = ({
  urls,
  isProcessing,
  onStartProcessing,
  onPauseProcessing,
  onResetAll,
  onExport
}) => {
  const stats = React.useMemo(() => {
    const total = urls.length;
    const completed = urls.filter(u => u.status === 'completed').length;
    const processing = urls.filter(u => u.status === 'processing').length;
    const errors = urls.filter(u => u.status === 'error').length;
    const pending = urls.filter(u => u.status === 'pending').length;
    
    return { total, completed, processing, errors, pending };
  }, [urls]);

  const progress = stats.total > 0 ? ((stats.completed + stats.errors) / stats.total) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Contrôle de traitement
        </h2>
        <div className="flex space-x-2">
          {!isProcessing ? (
            <button
              onClick={onStartProcessing}
              disabled={stats.total === 0 || stats.pending === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Démarrer</span>
            </button>
          ) : (
            <button
              onClick={onPauseProcessing}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </button>
          )}
          
          <button
            onClick={onResetAll}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          
          <button
            onClick={onExport}
            disabled={stats.completed === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progression globale</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
        </div>
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">En cours</div>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Terminées</div>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{stats.errors}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Erreurs</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">En attente</div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPanel;