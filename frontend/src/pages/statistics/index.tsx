import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui';
import '@progress/kendo-theme-default/dist/all.css';

interface StatisticsData {
  id: number;
  category: string;
  count: number;
  percentage: number;
  date: string;
}

const mockData: StatisticsData[] = [
  { id: 1, category: 'Category A', count: 1250, percentage: 35.5, date: '2024-01-15' },
  { id: 2, category: 'Category B', count: 980, percentage: 27.8, date: '2024-01-15' },
  { id: 3, category: 'Category C', count: 750, percentage: 21.3, date: '2024-01-15' },
  { id: 4, category: 'Category D', count: 540, percentage: 15.4, date: '2024-01-15' },
];

export function StatisticsPage() {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');
  const [category, setCategory] = useState('all');
  const [data] = useState<StatisticsData[]>(mockData);

  const handleSearch = () => {
    // 조회 로직 (현재는 목업 데이터만 표시)
    console.log('Search:', { startDate, endDate, category });
  };

  return (
    <div className="h-full p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">{t('statistics.title')}</h1>

      {/* 조회 조건 영역 */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">{t('statistics.searchConditions')}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('statistics.startDate')}</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('statistics.endDate')}</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('statistics.category')}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="category-a">Category A</option>
              <option value="category-b">Category B</option>
              <option value="category-c">Category C</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSearch} variant="primary" size="md">
            {t('statistics.search')}
          </Button>
        </div>
      </div>

      {/* 결과 테이블 영역 */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{t('statistics.results')}</h2>
        </div>
        <Grid data={data} style={{ height: '400px' }}>
          <GridColumn field="id" title="ID" width="80px" />
          <GridColumn field="category" title="Category" width="150px" />
          <GridColumn field="count" title="Count" width="120px" />
          <GridColumn field="percentage" title="Percentage" width="120px" />
          <GridColumn field="date" title="Date" width="150px" />
        </Grid>
      </div>
    </div>
  );
}
