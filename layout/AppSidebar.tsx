// // AppSidebar.tsx ()

// 'use client';

// import React, { useEffect, useState, useCallback } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSidebar } from "@/context/SidebarContext";
// import {
//   ChevronDownIcon,
//   GridIcon,
//   HorizontalDots,
//   TicketIcon,
//   UserCircleIcon,
// } from "@/icons";

// type NavItem = {
//   name: string;
//   icon: React.ReactNode;
//   path?: string;
//   subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
// };


// const navItems: NavItem[] = [
//   {
//     icon: <GridIcon />,
//     name: "Home",
//     subItems: [{ name: "HelpDesk", path: "/", pro: false }],
//   },
//   {
//     icon: <TicketIcon />,
//     name: "Ticket",
//     subItems: [
//       { name: "Add", path: "/ticket/add", pro: false },
//       { name: "View", path: "/ticket/view", pro: false },
//       { name: "Assign", path: "/ticket/assign", pro: false },
//       { name: "Reassign", path: "/ticket/reassign", pro: false },
//       { name: "Analysis", path: "/ticket/analysis", pro: false },
//     ],
//   },
//   {
//     icon: <UserCircleIcon />,
//     name: "User",
//     subItems: [
      
//       { name: "Add User", path: "/users/add", pro: false },
//       { name: "View", path: "/users/view", pro: false },
//     ],
//   },
// ];

// const othersItems: NavItem[] = [];

// const AppSidebar: React.FC = () => {
//   // const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
//   const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleSidebar } = useSidebar();
//   const pathname = usePathname();
//   const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number } | null>(null);

//   const isActive = useCallback((path: string) => path === pathname, [pathname]);

//   const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
//     setOpenSubmenu((prev) =>
//       prev?.type === menuType && prev?.index === index ? null : { type: menuType, index }
//     );
//   };

//   useEffect(() => {
//     navItems.forEach((nav, index) => {
//       if (nav.subItems?.some(item => item.path === pathname)) {
//         setOpenSubmenu({ type: "main", index });
//       } else if (nav.path === pathname) {
//         setOpenSubmenu(null);
//       }
//     });
//   }, [pathname]);

//   return (
//     <aside
//       className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-4 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
//         ${isExpanded || isMobileOpen ? "w-[280px]" : isHovered ? "w-[280px]" : "w-[80px]"}
//         ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0`}
//       onMouseEnter={() => !isExpanded && setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       aria-label="Sidebar Navigation"
//     >
//       <div className="py-6 flex flex-col items-center lg:items-start">
//         <Link href="/" className="flex items-center gap-2">
//           {isExpanded || isHovered || isMobileOpen ? (
//             <img src="/images/logo/logo-icon.svg" alt="Logo" className="w-[150px] h-[40px] dark:hidden" />
//           ) : (
//             <img src="/images/logo/logo-icon.svg" alt="Logo" className="w-[32px] h-[32px]" />
//           )}
//         </Link>
//       </div>

//       <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
//         <nav className="mb-6">
//           <div className="flex flex-col gap-4">
//             <div>
//               {/* <h2 className={`mb-3 text-xs uppercase text-gray-400 ${!isExpanded && !isHovered ? "text-center" : "text-left"}`}>
//                 {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontalDots />}
//               </h2> */}

// <div className={`mb-3 flex items-center ${!isExpanded && !isHovered ? "justify-center" : "justify-between"}`}>
//   <h2 className={`text-xs uppercase text-gray-400`}>
//     {isExpanded || isHovered || isMobileOpen ? "Menu" : ""}
//   </h2>
//   {(isExpanded || isHovered || isMobileOpen) && (
//     <button
//       onClick={toggleSidebar}
//       className="text-xs text-blue-600 hover:underline focus:outline-none"
//     >
//       {isExpanded ? "Hide" : "Show"}
//     </button>
//   )}
// </div>




//               <ul className="flex flex-col gap-2">
//                 {navItems.map((nav, index) => (
//                   <li key={nav.name}>
//                     {nav.subItems ? (
//                       <>
//                         <button
//                           onClick={() => handleSubmenuToggle(index, "main")}
//                           className={`flex items-center justify-start gap-3 w-full p-2 rounded-lg transition-all duration-200
//                             ${openSubmenu?.type === "main" && openSubmenu?.index === index
//                               ? "bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
//                               : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
//                             }`}
//                           aria-expanded={openSubmenu?.type === "main" && openSubmenu?.index === index}
//                         >
//                           <span className="text-gray-500 dark:text-gray-400">{nav.icon}</span>
//                           {(isExpanded || isHovered || isMobileOpen) && (
//                             <>
//                               <span className="font-medium">{nav.name}</span>
//                               <ChevronDownIcon
//                                 className={`ml-auto transition-transform duration-200 ${
//                                   openSubmenu?.type === "main" && openSubmenu?.index === index
//                                     ? "rotate-180 text-blue-600 dark:text-blue-400"
//                                     : ""
//                                 }`}
//                               />
//                             </>
//                           )}
//                         </button>

//                         {(isExpanded || isHovered || isMobileOpen) && (
//                           <div
//                             className={`overflow-hidden transition-all duration-200 ml-7 mt-1 ${
//                               openSubmenu?.type === "main" && openSubmenu?.index === index ? "max-h-60" : "max-h-0"
//                             }`}
//                           >
//                             <ul className="space-y-1">
//                               {nav.subItems.map((subItem) => (
//                                 <li key={subItem.name}>
//                                   <Link
//                                     href={subItem.path}
//                                     className={`flex justify-between items-center rounded-md p-2 text-sm
//                                       ${isActive(subItem.path)
//                                         ? "bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
//                                         : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
//                                       }`}
//                                   >
//                                     {subItem.name}
//                                     <span className="flex items-center gap-1">
//                                       {subItem.new && (
//                                         <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
//                                           new
//                                         </span>
//                                       )}
//                                       {subItem.pro && (
//                                         <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
//                                           pro
//                                         </span>
//                                       )}
//                                     </span>
//                                   </Link>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       nav.path && (
//                         <Link
//                           href={nav.path}
//                           className={`flex items-center justify-start gap-3 w-full p-2 rounded-lg transition-all duration-200
//                             ${isActive(nav.path)
//                               ? "bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
//                               : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
//                             }`}
//                         >
//                           <span
//                             className={`${
//                               isActive(nav.path) ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
//                             }`}
//                           >
//                             {nav.icon}
//                           </span>
//                           {(isExpanded || isHovered || isMobileOpen) && (
//                             <span className="font-medium">{nav.name}</span>
//                           )}
//                         </Link>
//                       )
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {othersItems.length > 0 && (
//               <div>
//                 <h2
//                   className={`mb-3 text-xs uppercase text-gray-400 ${
//                     !isExpanded && !isHovered ? "text-center" : "text-left"
//                   }`}
//                 >
//                   {isExpanded || isHovered || isMobileOpen ? "Others" : <HorizontalDots />}
//                 </h2>
//                 {/* Other items go here */}
//               </div>
//             )}
//           </div>
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default AppSidebar;


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
  ChevronRight
} from 'lucide-react';




type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard size={18} />,
    name: 'Home',
    subItems: [{ name: 'HelpDesk', path: '/', pro: false }],
  },
  {
    icon: <Ticket size={18} />,
    name: 'Ticket',
    subItems: [
      { name: 'Add', path: '/ticket/add' },
      { name: 'View', path: '/ticket/view' },
      { name: 'Assign', path: '/ticket/assign' },
      { name: 'Reassign', path: '/ticket/reassign' },
      { name: 'Analysis', path: '/ticket/analysis' },
    ],
  },
  {
    icon: <Users size={18} />,
    name: 'User',
    subItems: [
      { name: 'Add User', path: '/users/add' },
      { name: 'View', path: '/users/view' },
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
              {/* Section Header */}
              <div className={`mb-3 flex items-center ${!isExpanded && !isHovered ? 'justify-center' : 'justify-between'}`}>
                <h2 className="text-xs uppercase text-gray-400">
                  {isExpanded || isHovered || isMobileOpen ? 'Menu' : ''}
                </h2>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <button
                      onClick={toggleSidebar}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
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
                            className={`transition-all duration-200 ml-7 mt-1 overflow-hidden ${
                              openSubmenu?.type === 'main' && openSubmenu?.index === index ? 'max-h-60' : 'max-h-0'
                            }`}
                          >
                            <ul className="space-y-1">
                              {nav.subItems.map(subItem => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.path}
                                    className={`flex justify-between items-center rounded-md p-2 text-sm transition-colors
                                      ${
                                        isActive(subItem.path)
                                          ? 'bg-blue-100 text-blue-700 dark:bg-gray-800 dark:text-blue-400'
                                          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                                      }`}
                                  >
                                    {subItem.name}
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

            {/* Optional Others Section */}
            {othersItems.length > 0 && (
              <div>
                <h2
                  className={`mb-3 text-xs uppercase text-gray-400 ${
                    !isExpanded && !isHovered ? 'text-center' : 'text-left'
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? 'Others' : <MoreHorizontal size={14} />}
                </h2>
                {/* Render other nav items here */}
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
