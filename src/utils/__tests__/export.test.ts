import { describe, it, expect, vi } from 'vitest';
import * as exportUtils from '../export';
const { exportToCSV, saveContentAsTxt } = exportUtils;
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

  it('saves content with sanitized filename', () => {
    const spy = vi.spyOn(exportUtils, 'downloadFile');
    saveContentAsTxt('https://Example.com/some/path', 'hello');
    expect(spy).toHaveBeenCalled();
    const args = (spy as any).mock.calls[0];
    expect(args[1]).toMatch(/example_com_some_path\.txt$/);
    spy.mockRestore();
  });
});
