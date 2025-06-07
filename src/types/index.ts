export interface URLItem {
  id: string;
  url: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  framework?: MarketingFramework;
  titles?: string[];
  metaDescriptions?: string[];
  error?: string;
  content?: string;
  createdAt: Date;
}

export interface MarketingFramework {
  name: string;
  code: 'AIDA' | 'PAS' | 'STDC' | 'BAB' | 'QUEST' | 'PASTOR';
  description: string;
  color: string;
  justification?: string;
}

export interface ImportData {
  urls: string[];
  source: 'manual' | 'csv' | 'excel';
}

export interface ExportFormat {
  format: 'csv' | 'excel';
  includeAll: boolean;
  selectedIds?: string[];
}

export interface AppSettings {
  darkMode: boolean;
  autoStart: boolean;
  batchSize: number;
}