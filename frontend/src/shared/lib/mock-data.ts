import type { Alarm, AlarmEvent } from './types';

const SEVERITIES: Alarm['severity'][] = ['critical', 'major', 'minor', 'normal'];
const SOURCES = ['System A', 'System B', 'Network', 'Database', 'Application'];
const MESSAGES = [
  'High CPU usage detected',
  'Memory threshold exceeded',
  'Network latency spike',
  'Database connection pool exhausted',
  'Service unavailable',
  'Disk space low',
  'Failed authentication attempt',
  'Configuration error',
];

let alarmIdCounter = 0;
let dedupeKeyCounter = 0;

export function generateMockAlarm(): Alarm {
  const severity = SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)];
  const dedupeKey = `ALARM-${++dedupeKeyCounter}`;
  const now = Date.now();
  const randomOffset = Math.floor(Math.random() * 3600000); // 최근 1시간 내

  return {
    id: `alarm-${++alarmIdCounter}`,
    dedupeKey,
    severity,
    message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
    source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
    status: 'active',
    createdAt: now - randomOffset,
    updatedAt: now - randomOffset,
  };
}

export function generateAlarmEvent(type: AlarmEvent['type'], alarm: Alarm): AlarmEvent {
  return {
    type,
    alarm: { ...alarm },
    timestamp: Date.now(),
  };
}

export function createMockAlarmService() {
  const alarms = new Map<string, Alarm>();
  const events: AlarmEvent[] = [];
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const start = (onEvent: (event: AlarmEvent) => void) => {
    if (intervalId) return;

    // 초기 알람 생성
    for (let i = 0; i < 10; i++) {
      const alarm = generateMockAlarm();
      alarms.set(alarm.dedupeKey, alarm);
      const event = generateAlarmEvent('created', alarm);
      events.push(event);
      onEvent(event);
    }

    intervalId = setInterval(() => {
      const action = Math.random();

      if (action < 0.3) {
        // 새 알람 생성
        const alarm = generateMockAlarm();
        alarms.set(alarm.dedupeKey, alarm);
        const event = generateAlarmEvent('created', alarm);
        events.push(event);
        onEvent(event);
      } else if (action < 0.6 && alarms.size > 0) {
        // 알람 업데이트 (acknowledge)
        const keys = Array.from(alarms.keys());
        const key = keys[Math.floor(Math.random() * keys.length)];
        const alarm = alarms.get(key);
        if (alarm && alarm.status === 'active') {
          const updated = { ...alarm, status: 'acknowledged' as const, updatedAt: Date.now() };
          alarms.set(key, updated);
          const event = generateAlarmEvent('updated', updated);
          events.push(event);
          onEvent(event);
        }
      } else if (alarms.size > 0) {
        // 알람 해제
        const keys = Array.from(alarms.keys());
        const key = keys[Math.floor(Math.random() * keys.length)];
        const alarm = alarms.get(key);
        if (alarm) {
          const updated = {
            ...alarm,
            status: 'cleared' as const,
            updatedAt: Date.now(),
            clearedAt: Date.now(),
          };
          alarms.set(key, updated);
          const event = generateAlarmEvent('cleared', updated);
          events.push(event);
          onEvent(event);
          // 일정 시간 후 제거
          setTimeout(() => {
            alarms.delete(key);
          }, 5000);
        }
      }
    }, 3000); // 3초마다 이벤트 발생
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const getAlarms = (): Alarm[] => {
    return Array.from(alarms.values()).sort((a, b) => b.createdAt - a.createdAt);
  };

  const getEvents = (): AlarmEvent[] => {
    return [...events].slice(-50).reverse(); // 최근 50개
  };

  return {
    start,
    stop,
    getAlarms,
    getEvents,
  };
}

