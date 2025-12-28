import { matchPath, Navigate, useLocation } from 'react-router-dom';
import { useGetMenu } from '@/shared/hooks/useGetMenu';
import { find, get, head, isEmpty, isNotEmpty } from '@/shared/lib/util';
import { OverlayLoading } from '@/shared/ui';

interface AuthRedirectProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthRedirect({ children, requireAuth = true }: AuthRedirectProps) {
  const userAccessableMenuListdata = useGetMenu();
  const { pathname, key } = useLocation();

  // requireAuth가 false인 경우 (로그인 페이지 등)는 메뉴 체크 없이 바로 반환
  if (!requireAuth) {
    return <>{children}</>;
  }

  // 로딩 중
  if (userAccessableMenuListdata.isLoading) {
    return <OverlayLoading />;
  }

  // 에러 발생
  if (userAccessableMenuListdata.error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Error</h1>
          <p className="text-gray-600">Failed to load menu data</p>
        </div>
      </div>
    );
  }

  // 성공
  if (userAccessableMenuListdata.isSuccess) {
    const userAccessableMenuListData = userAccessableMenuListdata.data;
    const data = find(userAccessableMenuListData, (item) => {
      return isNotEmpty(matchPath(`${item.path}/*`, pathname));
    });
    const userUrl = get(head(userAccessableMenuListData), 'path', '/main');

    if (pathname !== '/main' && key === 'default') {
      return <Navigate to="/main" replace />;
    }

    // 매칭되는 메뉴가 없으면 첫 번째 메뉴로 리다이렉트
    if (isEmpty(data)) {
      return <Navigate to={userUrl || '/main'} replace />;
    }

    return <>{children}</>;
  }

  return <></>;
}
