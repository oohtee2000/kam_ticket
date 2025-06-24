// "use client";

// import { useSidebar } from "@/context/SidebarContext";
// import AppHeader from "@/layout/AppHeader";
// import AppSidebar from "@/layout/AppSidebar";
// import Backdrop from "@/layout/Backdrop";
// import React from "react";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { isExpanded, isHovered, isMobileOpen } = useSidebar();

//   // Dynamic class for main content margin based on sidebar state
//   const mainContentMargin = isMobileOpen
//     ? "ml-0"
//     : isExpanded || isHovered
//     ? "lg:ml-[290px]"
//     : "lg:ml-[90px]";

//   // Top margin to push content below the header
//   const contentMarginTop = "mt-16";

//   return (
//     <>
//       {/* app/layout.tsx or wherever the layout is structured */}
//       <main className="relative">
//         <AppHeader />
//         <AppSidebar />
//         <Backdrop />
//         <div className={`content ${mainContentMargin} ${contentMarginTop}`}>
//           {children}
//         </div>
//       </main>
//     </>
//   );
// }

// layout.tsx(C:\Next\kam\kam_ticket\kam_ticket-master\app\(admin)\layout.tsx)

'use client'

import React from "react";
import { SidebarProvider } from "@/context/SidebarContext";
// import AppHeader from "./AppHeader";
AppHeader
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import AppHeader from "@/layout/AppHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <AppHeader />
        <AppSidebar />
        <Backdrop />
        
        {/* Main Content */}
        {/* <main className="pt-16 lg:pt-16 lg:pl-[80px] transition-all duration-300">
          <div className="p-4 md:p-6 max-w-[1536px] mx-auto">
            {children}
          </div>
        </main> */}

<main className="pt-16 lg:pt-16 lg:pl-[80px] transition-all duration-300">
  <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-none">
    {children}
  </div>
</main>

      </div>
    </SidebarProvider>
  );
};

export default Layout;