import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import '@progress/kendo-theme-default/dist/all.css';

interface MonitoringData {
  id: number;
  name: string;
  status: string;
  value: number;
  timestamp: string;
  statusDisplay?: string;
}

const mockData: MonitoringData[] = [
  { id: 1, name: 'Server 1', status: 'Active', value: 85, timestamp: '2024-01-15 10:30:00' },
  { id: 2, name: 'Server 2', status: 'Active', value: 92, timestamp: '2024-01-15 10:30:00' },
  { id: 3, name: 'Server 3', status: 'Warning', value: 65, timestamp: '2024-01-15 10:30:00' },
  { id: 4, name: 'Server 4', status: 'Active', value: 78, timestamp: '2024-01-15 10:30:00' },
  { id: 5, name: 'Server 5', status: 'Error', value: 45, timestamp: '2024-01-15 10:30:00' },
];

export function MonitoringPage() {
  const { t } = useTranslation();
  const [data] = useState<MonitoringData[]>(mockData);

  const displayData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      statusDisplay: item.status,
    }));
  }, [data]);

  return (
    <div className="h-full p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">{t('monitoring.title')}</h1>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <Grid data={displayData} style={{ height: 'calc(100vh - 200px)' }}>
          <GridColumn field="id" title="ID" width="80px" />
          <GridColumn field="name" title="Name" width="150px" />
          <GridColumn field="statusDisplay" title="Status" width="120px" />
          <GridColumn field="value" title="Value" width="100px" />
          <GridColumn field="timestamp" title="Timestamp" width="200px" />
        </Grid>
      </div>
    </div>
  );
}
