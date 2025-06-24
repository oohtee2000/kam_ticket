'use client';

import Head from "next/head";
import Link from "next/link";

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
            A centralized support portal for managing tickets, tracking issues, and staying productive.
          </p>
        </section>

        {/* Quick Actions */}
        <section className="py-12 px-6">
          <h2 className="text-2xl font-semibold text-center mb-10">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { label: "Add Ticket", icon: "📝", href: "/ticket/add" },
              { label: "View Tickets", icon: "📄", href: "/ticket/view" },
              { label: "Assign Ticket", icon: "📌", href: "/ticket/assign" },
              { label: "Re-assign Ticket", icon: "🔄", href: "/ticket/reassign" },
              { label: "Track Ticket", icon: "🚚", href: "/track-ticket" },
              { label: "Analytics", icon: "📊", href: "/ticket/analysis" },
            ].map(({ label, icon, href }) => (
              <Link
                key={label}
                href={href}
                className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-lg font-medium">{label}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Why Kam Helpdesk?</h2>
            <p className="text-gray-700 text-lg">
              Kam Helpdesk streamlines IT and operational support with a clean, user-friendly interface. Built for speed,
              simplicity, and efficiency, it offers essential tools for both users and administrators without unnecessary
              clutter.
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
                  desc: "Users can report issues quickly using our streamlined ticket form.",
                },
                {
                  title: "Intuitive Tracking",
                  desc: "Keep an eye on ticket progress with color-coded statuses and timelines.",
                },
                {
                  title: "Smart Assignments",
                  desc: "Easily delegate tasks to the right personnel with just a click.",
                },
                {
                  title: "Simple User Management",
                  desc: "Create, manage, and remove helpdesk users with ease.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white p-6 rounded-lg shadow-md">
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
