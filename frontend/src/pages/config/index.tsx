import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui';

interface ThresholdConfig {
  id: string;
  name: string;
  currentValue: number;
  threshold: number;
  unit: string;
}

const mockThresholds: ThresholdConfig[] = [
  { id: 'cpu', name: 'CPU Usage', currentValue: 75, threshold: 80, unit: '%' },
  { id: 'memory', name: 'Memory Usage', currentValue: 65, threshold: 85, unit: '%' },
  { id: 'disk', name: 'Disk Usage', currentValue: 50, threshold: 90, unit: '%' },
  { id: 'network', name: 'Network Traffic', currentValue: 1200, threshold: 2000, unit: 'Mbps' },
];

export function ConfigPage() {
  const { t } = useTranslation();
  const [thresholds, setThresholds] = useState<ThresholdConfig[]>(mockThresholds);
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

  const handleEdit = (id: string) => {
    setIsEditing({ ...isEditing, [id]: true });
  };

  const handleSave = (id: string, newThreshold: number) => {
    setThresholds(
      thresholds.map((t) => (t.id === id ? { ...t, threshold: newThreshold } : t))
    );
    setIsEditing({ ...isEditing, [id]: false });
  };

  const handleCancel = (id: string) => {
    setIsEditing({ ...isEditing, [id]: false });
  };

  return (
    <div className="h-full p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {t('config.title')} - {t('config.thresholdSettings')}
      </h1>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('config.thresholdConfiguration')}
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {thresholds.map((threshold) => (
              <div
                key={threshold.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
              >
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{threshold.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {t('config.current')}: {threshold.currentValue}
                    {threshold.unit} / {t('config.threshold')}: {threshold.threshold}
                    {threshold.unit}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {isEditing[threshold.id] ? (
                    <>
                      <input
                        type="number"
                        defaultValue={threshold.threshold}
                        className="w-24 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id={`threshold-${threshold.id}`}
                      />
                      <span className="text-sm text-gray-600">{threshold.unit}</span>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          const input = document.getElementById(
                            `threshold-${threshold.id}`
                          ) as HTMLInputElement;
                          handleSave(threshold.id, Number(input.value));
                        }}
                      >
                        {t('config.save')}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCancel(threshold.id)}
                      >
                        {t('config.cancel')}
                      </Button>
                    </>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(threshold.id)}>
                      {t('config.edit')}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

