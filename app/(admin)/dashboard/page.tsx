import type { Metadata } from "next";
// import { HelpdeskMetrics } from "@/components/dashboard/HelpdeskMetrics";
import React from "react";
// import DepartmentTicketBreakdown from "@/components/dashboard/DepartmentTicketBreakdown";
// import MonthlyTicketsChart from "@/components/dashboard/MonthlyTicketsChart";
// import HelpdeskStatisticsChart from "@/components/dashboard/HelpdeskStatisticsChart";
// import RecentTickets from "@/components/dashboard/RecentTickets";
// import AgentPerformanceOverview from "@/components/dashboard/AgentPerformanceOverview";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Helpdesk() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        {/* <HelpdeskMetrics />

        <MonthlyTicketsChart /> */}
      </div>

      <div className="col-span-12 xl:col-span-5">
        {/* <DepartmentTicketBreakdown /> */}
      </div>

      <div className="col-span-12">
        {/* <HelpdeskStatisticsChart /> */}
      </div>

      <div className="col-span-12 xl:col-span-5">
        {/* <AgentPerformanceOverview /> */}
      </div>

      <div className="col-span-12 xl:col-span-7">
        {/* <RecentTickets /> */}
      </div>
    </div>
  );
}
