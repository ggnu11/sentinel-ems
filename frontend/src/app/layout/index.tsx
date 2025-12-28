import { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { SideMenu } from '@/widgets/SideMenu';
import { getAuth } from '@/shared/lib/auth';

export function NewLayout() {
  const location = useLocation();
  const auth = getAuth();
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(true);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      setIsDrawerExpanded(false);
    }
  }, []);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  const isMainPage = location.pathname === '/main';

  const handleMenuToggle = () => {
    setIsDrawerExpanded(!isDrawerExpanded);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f3f4f7]">
      <Header onMenuClick={handleMenuToggle} showMenuButton={true} />
      <SideMenu expanded={isDrawerExpanded} onToggle={handleMenuToggle}>
        <div
          className={`mt-14 flex-1 overflow-auto px-5 py-2.5 ${
            isMainPage ? 'overflow-x-auto overflow-y-hidden' : 'overflow-auto'
          }`}
        >
          <Outlet />
        </div>
      </SideMenu>
    </div>
  );
}
