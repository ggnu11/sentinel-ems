import { useState, useEffect, useMemo, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import type { DrawerSelectEvent } from '@progress/kendo-react-layout';
import { inboxIcon, eyeIcon, cartIcon, gearIcon } from '@progress/kendo-svg-icons';

interface SideMenuProps {
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

type MenuItemConfig = {
  separator?: false;
  translationKey: string;
  svgIcon: any;
  route: string;
};

const menuItemsConfig: MenuItemConfig[] = [
  { translationKey: 'menu.dashboard', svgIcon: inboxIcon, route: '/main' },
  { translationKey: 'menu.monitoring', svgIcon: eyeIcon, route: '/monitoring' },
  { translationKey: 'menu.statistics', svgIcon: cartIcon, route: '/statistics' },
  { translationKey: 'menu.config', svgIcon: gearIcon, route: '/config' },
];

export function SideMenu({ expanded, children }: SideMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // 번역된 메뉴 아이템 생성
  const menuItems = useMemo(() => {
    return menuItemsConfig.map((item) => {
      if (item.separator) {
        return { separator: true };
      }
      return {
        text: t(item.translationKey),
        svgIcon: item.svgIcon,
        route: item.route,
      };
    });
  }, [t, i18n.language]);

  const [selected, setSelected] = useState(
    menuItemsConfig.findIndex((item) => !item.separator && location.pathname === item.route)
  );

  const onSelect = (e: DrawerSelectEvent) => {
    const item = menuItemsConfig[e.itemIndex];
    if (item && !item.separator && item.route) {
      navigate(item.route);
      setSelected(e.itemIndex);
    }
  };

  // 현재 경로에 따라 selected 업데이트
  useEffect(() => {
    const currentSelected = menuItemsConfig.findIndex(
      (item) => !item.separator && item.route && location.pathname === item.route
    );
    if (currentSelected !== -1 && currentSelected !== selected) {
      setSelected(currentSelected);
    }
  }, [location.pathname, selected]);

  const drawerItems = menuItems.map((item, index) => ({
    ...item,
    selected: index === selected,
  }));

  return (
    <div className="[&_.k-drawer]:top-14! [&_.k-drawer]:z-40!">
      <Drawer
        expanded={expanded}
        position="start"
        mode="push"
        mini={false}
        items={drawerItems}
        onSelect={onSelect}
        className="h-screen"
      >
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </div>
  );
}
