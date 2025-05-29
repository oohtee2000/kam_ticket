"use client";
import React, { useState } from "react";
import Badge from "@components/ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, TicketIcon, CheckCircleIcon } from "@/icons";

export const HelpdeskMetrics = () => {
  // Static data instead of fetching from backend
  const [metrics] = useState({
    totalTickets: 120,    // static example value
    resolvedTickets: 85,  // static example value
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Total Tickets */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <TicketIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Tickets
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {metrics.totalTickets}
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            {/* Static badge, no growth % */}
          </Badge>
        </div>
      </div>

      {/* Resolved Tickets */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CheckCircleIcon className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Resolved Tickets
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {metrics.resolvedTickets}
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            {/* Static badge, no decrease % */}
          </Badge>
        </div>
      </div>
    </div>
  );
};
