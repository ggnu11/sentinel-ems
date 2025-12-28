export interface AuthData {
  token: string;
  userId: string;
  username: string;
}

export interface RouteObject2 {
  path: string;
  element?: React.ReactElement;
  children?: RouteObject2[];
  text?: string;
  index?: boolean;
}

export interface Alarm {
  id: string;
  dedupeKey: string;
  severity: 'critical' | 'major' | 'minor' | 'normal';
  message: string;
  source: string;
  status: 'active' | 'acknowledged' | 'cleared';
  createdAt: number;
  updatedAt: number;
  clearedAt?: number;
}

export interface AlarmEvent {
  type: 'created' | 'updated' | 'cleared';
  alarm: Alarm;
  timestamp: number;
}

