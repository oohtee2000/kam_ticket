'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';
import {
  LayoutDashboard,
  Ticket,
  Users,
  ChevronDown,
  MoreHorizontal,
  CircleUserRound,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  Share2,
  RefreshCcw,
  BarChart2,
  Repeat,
  UserPlus,
  UserCheck,
  Layers3,
} from 'lucide-react';

type SubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
  icon?: React.ReactNode;
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubItem[];
};

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard size={18} />,
    name: 'Home',
    subItems: [
      {
        name: 'HelpDesk',
        path: '/',
        icon: <Layers3 size={16} />,
      },
    ],
  },
  {
    icon: <Ticket size={18} />,
    name: 'Ticket',
    subItems: [
      { name: 'Add', path: '/ticket/add', icon: <Plus size={16} /> },
      { name: 'View', path: '/ticket/view', icon: <Eye size={16} /> },
      { name: 'Assign', path: '/ticket/assign', icon: <Share2 size={16} /> },
      { name: 'Reassign', path: '/ticket/reassign', icon: <RefreshCcw size={16} /> },
      { name: 'Analysis', path: '/ticket/analysis', icon: <BarChart2 size={16} /> },
      { name: 'Change Status', path: '/ticket/change-status', icon: <Repeat size={16} /> },
    ],
  },
  {
    icon: <Users size={18} />,
    name: 'User',
    subItems: [
      { name: 'Add User', path: '/users/add', icon: <UserPlus size={16} /> },
      { name: 'View', path: '/users/view', icon: <UserCheck size={16} /> },
    ],
  },
];

const othersItems: NavItem[] = [];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<{ type: 'main' | 'others'; index: number } | null>(null);

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
    setOpenSubmenu(prev =>
      prev?.type === menuType && prev?.index === index ? null : { type: menuType, index }
    );
  };

  useEffect(() => {
    navItems.forEach((nav, index) => {
      if (nav.subItems?.some(item => item.path === pathname)) {
        setOpenSubmenu({ type: 'main', index });
      } else if (nav.path === pathname) {
        setOpenSubmenu(null);
      }
    });
  }, [pathname]);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-4 left-0 bg-white dark:bg-black text-gray-900 dark:text-white h-screen z-50 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out
        ${isExpanded || isMobileOpen ? 'w-[280px]' : isHovered ? 'w-[280px]' : 'w-[80px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="py-6 flex flex-col items-center lg:items-start">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo/logo-icon.svg"
            alt="Logo"
            className={`transition-all ${
              isExpanded || isHovered || isMobileOpen ? 'w-[150px] h-[40px]' : 'w-[32px] h-[32px]'
            }`}
          />
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-col overflow-y-auto">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <div className={`mb-3 flex items-center ${!isExpanded && !isHovered ? 'justify-center' : 'justify-between'}`}>
                <h2 className="text-xs uppercase text-gray-400">
                  {isExpanded || isHovered || isMobileOpen ? 'Menu' : ''}
                </h2>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <button
                    onClick={toggleSidebar}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                  >
                    {isExpanded ? (
                      <ChevronLeft className="w-4 h-4 text-blue-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                )}
              </div>

              {/* Menu Items */}
              <ul className="flex flex-col gap-2">
                {navItems.map((nav, index) => (
                  <li key={nav.name}>
                    {nav.subItems ? (
                      <>
                        <button
                          onClick={() => handleSubmenuToggle(index, 'main')}
                          className={`flex items-center gap-3 w-full p-2 rounded-lg group transition-colors duration-200
                            ${
                              openSubmenu?.type === 'main' && openSubmenu?.index === index
                                ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400'
                                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                            }`}
                        >
                          <span className="text-gray-500 dark:text-gray-400">{nav.icon}</span>
                          {(isExpanded || isHovered || isMobileOpen) && (
                            <>
                              <span className="font-medium">{nav.name}</span>
                              <ChevronDown
                                className={`ml-auto transition-transform duration-200 ${
                                  openSubmenu?.type === 'main' && openSubmenu?.index === index
                                    ? 'rotate-180 text-blue-600 dark:text-blue-400'
                                    : 'text-gray-400'
                                }`}
                                size={16}
                              />
                            </>
                          )}
                        </button>

                        {/* Submenu */}
                        {(isExpanded || isHovered || isMobileOpen) && (
                          <div
                            className={`transition-all duration-300 ml-7 mt-1 overflow-hidden ${
                              openSubmenu?.type === 'main' && openSubmenu?.index === index ? 'max-h-96' : 'max-h-0'
                            }`}
                          >
                            <ul className="space-y-1">
                              {nav.subItems.map(subItem => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.path}
                                    className={`flex items-center gap-2 rounded-md p-2 text-sm transition-colors
                                      ${
                                        isActive(subItem.path)
                                          ? 'bg-blue-100 text-blue-700 dark:bg-gray-800 dark:text-blue-400'
                                          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                                      }`}
                                  >
                                    <span>{subItem.icon}</span>
                                    <span className="flex-1">{subItem.name}</span>
                                    <span className="flex items-center gap-1">
                                      {subItem.new && (
                                        <span className="text-xs px-1.5 py-0.5 rounded bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                          new
                                        </span>
                                      )}
                                      {subItem.pro && (
                                        <span className="text-xs px-1.5 py-0.5 rounded bg-purple-200 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                                          pro
                                        </span>
                                      )}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      nav.path && (
                        <Link
                          href={nav.path}
                          className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors
                            ${
                              isActive(nav.path)
                                ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400'
                                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                            }`}
                        >
                          <span className="text-gray-500 dark:text-gray-400">{nav.icon}</span>
                          {(isExpanded || isHovered || isMobileOpen) && (
                            <span className="font-medium">{nav.name}</span>
                          )}
                        </Link>
                      )
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
