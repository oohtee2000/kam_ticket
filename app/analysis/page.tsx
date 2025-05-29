
// "use client";
// import React from "react";
// import { HelpdeskMetrics } from "@/components/dashboard/HelpdeskMetrics";
// import MonthlyTicketsChart from "@/components/dashboard/MonthlyTicketsChart";
// import DepartmentTicketBreakdown from "@/components/dashboard/DepartmentTicketBreakdown";
// import HelpdeskStatisticsChart from "@/components/dashboard/HelpdeskStatisticsChart";
// import AgentPerformanceOverview from "@/components/dashboard/AgentPerformanceOverview";

// export default function HelpdeskDashboard() {
//   return (
//     <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <HelpdeskMetrics />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <MonthlyTicketsChart />
//         <DepartmentTicketBreakdown />
//       </div>

//       <HelpdeskStatisticsChart />

//       <AgentPerformanceOverview />
//     </div>
//   );
// }



"use client";

import React from "react";
import dynamic from "next/dynamic";

import { HelpdeskMetrics } from "@/components/dashboard/HelpdeskMetrics";

const MonthlyTicketsChart = dynamic(() => import("@/components/dashboard/MonthlyTicketsChart"), { ssr: false });
const DepartmentTicketBreakdown = dynamic(() => import("@/components/dashboard/DepartmentTicketBreakdown"), { ssr: false });
const HelpdeskStatisticsChart = dynamic(() => import("@/components/dashboard/HelpdeskStatisticsChart"), { ssr: false });
const AgentPerformanceOverview = dynamic(() => import("@/components/dashboard/AgentPerformanceOverview"), { ssr: false });

export default function HelpdeskDashboard() {
  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <HelpdeskMetrics />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MonthlyTicketsChart />
        <DepartmentTicketBreakdown />
      </div>

      <HelpdeskStatisticsChart />

      <AgentPerformanceOverview />
    </div>
  );
}
