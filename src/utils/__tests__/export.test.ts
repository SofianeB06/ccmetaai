import { describe, it, expect } from 'vitest';
import { exportToCSV } from '../export';
import type { URLItem } from '../../types';

describe('exportToCSV', () => {
  it('creates CSV string with headers and data', () => {
    const items: URLItem[] = [
      {
        id: '1',
        url: 'https://example.com',
        status: 'completed',
        framework: { name: 'AIDA', code: 'AIDA', description: '', color: '', justification: 'just' },
        titles: ['Title1', 'Title2', 'Title3'],
        metaDescriptions: ['Desc1', 'Desc2', 'Desc3'],
        createdAt: new Date(),
      },
    ];

    const csv = exportToCSV(items);
    expect(csv.startsWith('"URL","Status","Framework"')).toBe(true);
    expect(csv).toContain('"https://example.com"');
  });
});
