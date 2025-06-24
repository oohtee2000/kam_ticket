// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-center px-4">
        {/* Centered Brand */}
        <Link href="/" className="flex items-center space-x-1 text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          <span className="text-blue-600 font-bold">Kam</span>
          <span>Helpdesk</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
