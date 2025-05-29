import { Outfit } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/navbar/navbar";
// import Footer from "@/components/footer/footer"; // Uncomment when ready

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} dark:bg-gray-900 min-h-screen`}>
        <ThemeProvider>
          <SidebarProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 bg-gray-50 dark:bg-gray-900 pt-0">
                {children}
              </main>
              {/* <Footer /> */}
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
