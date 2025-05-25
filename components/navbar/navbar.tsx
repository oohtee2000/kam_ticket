// app/components/Navbar.tsx or components/Navbar.tsx (depending on your folder structure)
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Kam</span>
            <span className="ml-1 text-xl font-medium">Helpdesk</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
