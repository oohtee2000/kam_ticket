
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
import MonthlyTicketsChart from "@/components/dashboard/MonthlyTicketsChart";
import DepartmentTicketBreakdown from "@/components/dashboard/DepartmentTicketBreakdown";
import HelpdeskStatisticsChart from "@/components/dashboard/HelpdeskStatisticsChart";






const RecentTicketsTable = dynamic(() => import("@/components/dashboard/RecentTicketsTable"), { ssr: false });

export default function HelpdeskDashboard() {
  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <HelpdeskMetrics />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MonthlyTicketsChart />
        <DepartmentTicketBreakdown />
      </div>

      <HelpdeskStatisticsChart />

      <RecentTicketsTable />
    </div>
  );
}
