"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const Navbar = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Centered Brand */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/"
            className="flex items-center space-x-1 text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >
            <span className="text-blue-600 font-bold">Kam</span>
            <span>Helpdesk</span>
          </Link>
        </div>

        {/* Empty div to balance flex space */}
        <div className="w-[60px] sm:w-[80px]"></div>
      </div>
    </nav>
  );
};

export default Navbar;
