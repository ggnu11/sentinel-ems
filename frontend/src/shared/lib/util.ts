/**
 * 배열에서 조건에 맞는 첫 번째 요소를 찾습니다
 */
export function find<T>(array: T[], predicate: (item: T) => boolean): T | undefined {
  return array.find(predicate);
}

/**
 * 객체에서 경로로 값을 가져옵니다
 */
export function get<T>(object: any, path: string, defaultValue?: T): T | undefined {
  const keys = path.split('.');
  let result = object;
  for (const key of keys) {
    if (result == null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== undefined ? result : defaultValue;
}

/**
 * 배열의 첫 번째 요소를 반환합니다
 */
export function head<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

/**
 * 값이 비어있는지 확인합니다
 */
export function isEmpty(value: any): boolean {
  if (value == null) {
    return true;
  }
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
}

/**
 * 값이 비어있지 않은지 확인합니다
 */
export function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}

