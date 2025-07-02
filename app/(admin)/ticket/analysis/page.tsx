"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { useAuth } from "@/hooks/useAuth";

import { HelpdeskMetrics } from "@/components/dashboard/HelpdeskMetrics";
import MonthlyTicketsChart from "@/components/dashboard/MonthlyTicketsChart";
import DepartmentTicketBreakdown from "@/components/dashboard/DepartmentTicketBreakdown";
import HelpdeskStatisticsChart from "@/components/dashboard/HelpdeskStatisticsChart";

const RecentTicketsTable = dynamic(() => import("@/components/dashboard/RecentTicketsTable"), {
  ssr: false,
});

export default function HelpdeskDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.replace("/unauthorized");
      } else if (user.role !== "Superadmin") {
        router.replace("/unauthorized");
      }
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

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
