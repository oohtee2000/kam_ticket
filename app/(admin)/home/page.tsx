'use client';

import Head from "next/head";
import Link from "next/link";
import {
  PlusCircle,
  ClipboardList,
  UserPlus,
  Users,
  BarChart3,
  Repeat2,
  Settings,
  Ticket,
  FileSearch,
  CircleCheck,
  ShieldCheck,
  Globe,
  Activity,
  LayoutDashboard
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kam Helpdesk</title>
        <meta name="description" content="Kam Helpdesk Portal" />
      </Head>

      <main className="min-h-screen bg-gray-100 text-gray-800">
        {/* Hero Header */}
        <section className="bg-blue-700 text-white py-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kam Helpdesk</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            A centralized support portal for managing tickets, tracking issues, and improving operational efficiency.
          </p>
        </section>

        {/* Quick Actions by Role */}
        <section className="py-16 px-6 bg-white border-t border-gray-200">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">Quick Actions by Role</h2>

          {/* Superadmin Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-700 text-center mb-6">Superadmin</h3>
            <p className="text-center text-gray-600 mb-10">Full access to manage tickets, users, and system settings.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { label: "Add Ticket", href: "/ticket/add", icon: PlusCircle },
                { label: "View Tickets", href: "/ticket/view", icon: ClipboardList },
                { label: "Assign Ticket", href: "/ticket/assign", icon: ShieldCheck },
                { label: "Re-assign Ticket", href: "/ticket/reassign", icon: Repeat2 },
                { label: "Analytics Dashboard", href: "/ticket/analysis", icon: BarChart3 },
                { label: "Change Ticket Status", href: "/ticket/status", icon: CircleCheck },
                { label: "Add User", href: "/users/add", icon: UserPlus },
                { label: "View Users", href: "/users/view", icon: Users },
              ].map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-200 text-center"
                >
                  <Icon className="mx-auto mb-2 text-blue-600" size={28} />
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{label}</h4>
                  <p className="text-sm text-gray-500">Manage related activities</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Admin Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-green-700 text-center mb-6">Admin</h3>
            <p className="text-center text-gray-600 mb-10">Limited access to manage ticket status and progress.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link
                href="/ticket/status"
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-200 text-center"
              >
                <CircleCheck className="mx-auto mb-2 text-green-600" size={28} />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Change Ticket Status</h4>
                <p className="text-sm text-gray-500">Update status of assigned tickets</p>
              </Link>
            </div>
          </div>

          {/* Public Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Public</h3>
            <p className="text-center text-gray-600 mb-10">Open access to raise and track support tickets.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link
                href="/ticket/add"
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-200 text-center"
              >
                <Ticket className="mx-auto mb-2 text-gray-700" size={28} />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Submit a Ticket</h4>
                <p className="text-sm text-gray-500">Report an issue or request</p>
              </Link>
              <Link
                href="/track-ticket"
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-200 text-center"
              >
                <FileSearch className="mx-auto mb-2 text-gray-700" size={28} />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Track Your Ticket</h4>
                <p className="text-sm text-gray-500">Check ticket progress and resolution</p>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Why Kam Helpdesk?</h2>
            <p className="text-gray-700 text-lg">
              Kam Helpdesk streamlines IT and operational support with a clean, user-friendly interface. Built for speed,
              simplicity, and role-specific control, it empowers superadmins, admins, users, and even public visitors to take the right actions with minimal effort.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-10">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Instant Ticket Logging",
                  desc: "Users and public visitors can report issues quickly using a simple form.",
                  icon: PlusCircle,
                },
                {
                  title: "Intuitive Tracking",
                  desc: "Track ticket progress with real-time status and color-coded timelines.",
                  icon: Activity,
                },
                {
                  title: "Role-Based Management",
                  desc: "Superadmins and admins can assign, reassign, and update tickets effortlessly.",
                  icon: Settings,
                },
                {
                  title: "Visual Insights",
                  desc: "Get powerful analytics on ticket trends, resolution speed, and team performance.",
                  icon: LayoutDashboard,
                },
              ].map(({ title, desc, icon: Icon }) => (
                <div key={title} className="bg-white p-6 rounded-lg shadow-md">
                  <Icon className="mb-3 text-blue-600" size={26} />
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-800 text-white text-center py-6 mt-10">
          <p>&copy; {new Date().getFullYear()} Kam Helpdesk. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
