

// "use client";  

// import React, { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Dropdown } from "../ui/dropdown/Dropdown";
// import { DropdownItem } from "../ui/dropdown/DropdownItem";
// import { useAuth } from "@/hooks/useAuth";

// export default function UserDropdown() {
//   const { user, loading } = useAuth(); // ✅ now using hook
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     setIsOpen((prev) => !prev);
//   };

//   const closeDropdown = () => {
//     setIsOpen(false);
//   };

//   const profileImage = user?.profile_picture ?? "default.jpg";

//   if (loading) {
//     return <div>Loading user info...</div>; // Optional loading state
//   }

//   return (
//     <div className="relative">
//       <button
//         onClick={toggleDropdown}
//         className="flex items-center text-gray-700 dark:text-gray-400"
//       >
//         <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
//           <Image
//             src={`https://kam-ticket-express-api.onrender.com/uploads/${profileImage}`}
//             alt="User Avatar"
//             width={44}
//             height={44}
//           />
//         </span>
//         <span className="block mr-1 font-medium text-theme-sm">
//           {user?.name ?? "Guest"}
//         </span>
//         <svg
//           className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
//           width="18"
//           height="20"
//           viewBox="0 0 18 20"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </button>

//       <Dropdown
//         isOpen={isOpen}
//         onClose={closeDropdown}
//         className="absolute right-0 mt-[17px] w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
//       >
//         <div className="pb-3 border-b border-gray-200 dark:border-gray-800">
//           <span className="block font-medium text-theme-sm text-gray-700 dark:text-gray-400">
//             {user?.name ?? "Guest"}
//           </span>
//           <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
//             {user?.email ?? "Email not available"}
//           </span>
//           <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
//             {user?.role ? `Role: ${user.role}` : "Role: Unknown"}
//           </span>
//         </div>

//         <ul className="flex flex-col gap-1 pt-4">
//           <li>
//             <DropdownItem
//               onItemClick={closeDropdown}
//               tag="a"
//               href="/profile"
//               className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//             >
//               Edit Profile
//             </DropdownItem>
//           </li>
//         </ul>

//         <button
//           onClick={handleLogout}
//           className="w-full px-3 py-2 mt-3 text-left text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900"
//         >
//           Logout
//         </button>
//       </Dropdown>
//     </div>
//   );
// }
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';

const UserDropdown: React.FC = () => {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isOpen &&
        !document.getElementById('user-dropdown')?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 animate-pulse">
        <div className="h-8 w-8 rounded-full bg-gray-300" />
        <div className="hidden md:block space-y-1">
          <div className="h-4 bg-gray-300 w-20 rounded" />
          <div className="h-3 bg-gray-200 w-28 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div id="user-dropdown" className="relative" onClick={toggleDropdown}>
      <div className="flex items-center gap-2 cursor-pointer">
      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600">
  {user?.profile_picture ? (
    <img
      src={`https://kam-ticket-express-api.onrender.com/uploads/${user.profile_picture}`}
      alt="User Avatar"
      className="w-full h-full object-cover"
    />
  ) : (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )}
</div>

        <div className="hidden md:block text-left">
          <p className="text-sm font-medium">{user?.name ?? 'Guest'}</p>
          <p className="text-xs text-gray-500">{user?.email ?? 'user@example.com'}</p>
        </div>
      </div>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark z-50"
      >
        <div className="pb-3 border-b border-gray-200 dark:border-gray-800">
          <span className="block font-medium text-theme-sm text-gray-700 dark:text-gray-400">
            {user?.name ?? 'Guest'}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.email ?? 'Email not available'}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.role ? `Role: ${user.role}` : 'Role: Unknown'}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 mt-3 text-left text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900"
        >
          Logout
        </button>
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
