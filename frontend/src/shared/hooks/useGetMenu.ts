import { useQuery } from '@tanstack/react-query';

export interface MenuItem {
  path: string;
  text?: string;
  [key: string]: any;
}

// 목업 메뉴 데이터
const mockMenuData: MenuItem[] = [
  { path: '/main', text: 'Dashboard' },
  { path: '/performance', text: 'Performance & Sales' },
  { path: '/products', text: 'Products' },
  { path: '/settings', text: 'Settings' },
];

// 목업 API 호출 시뮬레이션
const fetchMenu = async (): Promise<MenuItem[]> => {
  // 실제 API 호출을 시뮬레이션하기 위한 딜레이
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockMenuData;
};

export function useGetMenu() {
  return useQuery({
    queryKey: ['menu'],
    queryFn: fetchMenu,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분 (이전 cacheTime)
  });
}

