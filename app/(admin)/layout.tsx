// 'use client';

// import { useRouter } from "next/navigation";
// import React from "react";
// import { SidebarProvider } from "@/context/SidebarContext";
// import AppSidebar from "@/layout/AppSidebar";
// import Backdrop from "@/layout/Backdrop";

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const router = useRouter();

//   const handleLogout = async () => {
//     // Optional: Call logout endpoint
//     try {
//       await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//     } catch (error) {
//       console.error("Logout API error:", error);
//       // Even if logout API fails, proceed to clear token and redirect
//     }

//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   return (
//     <SidebarProvider>
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
//         <nav className="left-0 right-0 z-40 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-end px-6 shadow-sm">
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
//           >
//             Logout
//           </button>
//         </nav>

//         <AppSidebar />
//         <Backdrop />

//         <main className="pt-16 lg:pt-16 lg:pl-[80px] transition-all duration-300">
//           <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-none">
//             {children}
//           </div>
//         </main>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default Layout;




'use client';

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  // 🛡️ Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      // Optional: Verify token by calling protected endpoint
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/protected`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Invalid or expired token");
          }
          return res.json();
        })
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/login");
        });
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Logout API error:", error);
    }

    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <nav className="left-0 right-0 z-40 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-end px-6 shadow-sm">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </nav>

        <AppSidebar />
        <Backdrop />

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
