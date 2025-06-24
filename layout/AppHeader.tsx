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

  const handleLogout = () => {
    console.log("Logging out...");
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
        className={`fixed top-0 z-40 h-16 bg-white shadow-md flex items-center px-4 transition-all duration-300 ${headerMarginLeft} ${headerWidth}`}
      >
        {/* Sidebar toggle button (optional) */}
        <button
          onClick={handleToggle}
          className="lg:hidden mr-4 text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
    
        {/* Centered Brand Name */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="text-xl font-semibold text-gray-800">
            MyBrand
          </Link>
        </div>
    
        {/* Right-side user dropdown */}
        <div className="absolute right-4">
          <UserDropdown onLogout={handleLogout} />
        </div>
      </header>
    );
    
};

export default AppHeader;
