// "use client";
// import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
// import NotificationDropdown from "@/components/header/NotificationDropdown";
// import UserDropdown from "@/components/header/UserDropdown";
// import { useSidebar } from "@/context/SidebarContext";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useEffect, useRef, useContext} from "react";


// const AppHeader: React.FC = () => {
//   const { isExpanded, isHovered, isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
//   const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleToggle = () => {
//     if (window.innerWidth >= 1024) {
//       toggleSidebar();
//     } else {
//       toggleMobileSidebar();
//     }
//   };

//   const toggleApplicationMenu = () => {
//     setApplicationMenuOpen(!isApplicationMenuOpen);
//   };

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if ((event.metaKey || event.ctrlKey) && event.key === "k") {
//         event.preventDefault();
//         inputRef.current?.focus();
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   // Calculate dynamic margin and width based on sidebar state
//   const headerMarginLeft = isMobileOpen
//     ? "ml-0"
//     : isExpanded || isHovered
//     ? "lg:ml-[290px]"
//     : "lg:ml-[90px]";

//   const headerWidth = isMobileOpen
//     ? "w-full"
//     : isExpanded || isHovered
//     ? "lg:w-[calc(100%-290px)]"
//     : "lg:w-[calc(100%-90px)]";

//   return ( 
//     <header
//       className={`sticky top-0 flex bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 border-b z-99999 transition-all duration-300 ease-in-out ${headerMarginLeft} ${headerWidth}`}
//     >
//       <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
//         <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
//           <button
//             className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
//             onClick={handleToggle}
//             aria-label="Toggle Sidebar"
//           >
//             {isMobileOpen ? (
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 width="16"
//                 height="12"
//                 viewBox="0 0 16 12"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             )}
//             {/* Cross Icon */}
//           </button>
// <Link href="/" className="lg:hidden flex items-center">
//   <Image
//     width={120}
//     height={25}
//     className="dark:hidden object-contain "
//     src="/images/logo/logo-icon.svg"
//     alt="Logo"
//     objectFit="contain"
//   />
//   <Image
//     width={120}
//     height={25}
//     className="hidden dark:block"
//     src="/images/logo/logo-dark.svg"
//     alt="Logo"
//     objectFit="contain"
//   />
// </Link>



//           <button
//             onClick={toggleApplicationMenu}
//             className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
//           >
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >  
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
//                 fill="currentColor"
//               />
//             </svg>
//           </button>

//           <div className="hidden lg:block">
//             <form>
//               <div className="relative">
//                 <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
//                   <svg
//                     className="fill-gray-500 dark:fill-gray-400"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
//                       fill=""
//                     />
//                   </svg>
//                 </span>
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   placeholder="Search or type command..."
//                   className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
//                 />

//                 <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
//                   <span> ⌘ </span>
//                   <span> K </span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div
//           className={`${
//             isApplicationMenuOpen ? "flex" : "hidden"
//           } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
//         >
//           <div className="flex items-center gap-2 2xsm:gap-3">
//           </div>
//           {/* <!-- User Area --> */}
//           <UserDropdown /> 
    
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AppHeader;


// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import UserDropdown from "@/components/header/UserDropdown";
// import { useSidebar } from "@/context/SidebarContext";

// const AppHeader: React.FC = () => {
//   const {
//     isExpanded,
//     isHovered,
//     isMobileOpen,
//     toggleSidebar,
//     toggleMobileSidebar,
//   } = useSidebar();
//   const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

//   const handleToggle = () => {
//     if (typeof window !== "undefined" && window.innerWidth >= 1024) {
//       toggleSidebar();
//     } else {
//       toggleMobileSidebar();
//     }
//   };

//   const toggleApplicationMenu = () => {
//     setApplicationMenuOpen(!isApplicationMenuOpen);
//   };

//   // Calculate dynamic margin and width based on sidebar state
//   const headerMarginLeft = isMobileOpen
//     ? "ml-0"
//     : isExpanded || isHovered
//     ? "lg:ml-[280px]"
//     : "lg:ml-[80px]";

//   const headerWidth = isMobileOpen
//     ? "w-full"
//     : isExpanded || isHovered
//     ? "lg:w-[calc(100%-280px)]"
//     : "lg:w-[calc(100%-80px)]";

//   return (
//     <header
//   className={`fixed top-0 flex w-full bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 border-b z-40 transition-all duration-300 ease-in-out ${headerMarginLeft} ${headerWidth}`}
// >

//       <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
//         <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
//           <button
//             className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-50 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
//             onClick={handleToggle}
//             aria-label="Toggle Sidebar"
//           >
//             {isMobileOpen ? (
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 width="16"
//                 height="12"
//                 viewBox="0 0 16 12"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             )}
//           </button>

//           <Link href="/" className="lg:hidden flex items-center">
//             <img
//               className="dark:hidden object-contain h-8"
//               src="/images/logo/logo-icon.svg"
//               alt="Logo"
//             />
//             <img
//               className="hidden dark:block h-8"
//               src="/images/logo/logo-dark.svg"
//               alt="Logo"
//             />
//           </Link>

//           <button
//             onClick={toggleApplicationMenu}
//             className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-50 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
//           >
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
//                 fill="currentColor"
//               />
//             </svg>
//           </button>
//         </div>

//         <div
//   className={`${
//     isApplicationMenuOpen ? "flex" : "hidden"
//   } items-center w-full gap-4 px-5 py-4 justify-center lg:justify-end lg:flex shadow-md lg:px-0 lg:shadow-none`}
// >
//   <UserDropdown />
// </div>

//       </div>
//     </header>
//   );
// };

// export default AppHeader;









"use client";

import React, { useState } from "react";
import Link from "next/link";
import UserDropdown from "@/components/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";

const AppHeader: React.FC = () => {
  const {
    isExpanded,
    isHovered,
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar,
  } = useSidebar();
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const headerMarginLeft = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[280px]"
    : "lg:ml-[80px]";

  const headerWidth = isMobileOpen
    ? "w-full"
    : isExpanded || isHovered
    ? "lg:w-[calc(100%-280px)]"
    : "lg:w-[calc(100%-80px)]";

  return (
    <header
      className={`fixed top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-white px-3 text-sm text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out ${headerMarginLeft} ${headerWidth}`}
    >
      <div className="flex w-full items-center justify-between lg:px-6">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
              >
                <path
                  d="M6.22 6.22a.75.75 0 011.06 0L12 10.94l4.72-4.72a.75.75 0 111.06 1.06L13.06 12l4.72 4.72a.75.75 0 11-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 11-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 010-1.06z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M1.33.25h13.33a.75.75 0 010 1.5H1.33a.75.75 0 010-1.5zM1.33 10.25h13.33a.75.75 0 010 1.5H1.33a.75.75 0 010-1.5zM1.33 5.25h6.67a.75.75 0 010 1.5H1.33a.75.75 0 010-1.5z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <img
              className="h-8 object-contain dark:hidden"
              src="/images/logo/logo-icon.svg"
              alt="Logo"
            />
            <img
              className="hidden h-8 object-contain dark:block"
              src="/images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 lg:gap-6">
          <button
            onClick={toggleApplicationMenu}
            className="flex h-10 w-10 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
            aria-label="More"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M6 10.5A1.5 1.5 0 107.5 12 1.5 1.5 0 006 10.5zM12 10.5A1.5 1.5 0 1013.5 12 1.5 1.5 0 0012 10.5zM18 10.5A1.5 1.5 0 1019.5 12 1.5 1.5 0 0018 10.5z"
                fill="currentColor"
              />
            </svg>
          </button>

          <div
            className={`${
              isApplicationMenuOpen ? "flex" : "hidden"
            } lg:flex items-center gap-4`}
          >
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

