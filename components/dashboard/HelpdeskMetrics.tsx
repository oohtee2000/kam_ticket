"use client";
import React, { useEffect, useState } from "react";
import Badge from "@components/ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, TicketIcon, CheckCircleIcon } from "@/icons";
import axios from "axios"; // Make sure you install axios if not already

export const HelpdeskMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalTickets: 0,
    resolvedTickets: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get("https://kam-ticket-express-api.onrender.com/api/tickets/metrics/counts"); // Adjust if your API URL is different
        setMetrics(response.data);
      } catch (error) {
        console.error("Error fetching ticket metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

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
            {/* You can show growth % here if you want */}
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
            {/* You can show decrease % here if you want */}
          </Badge>
        </div>
      </div>
    </div>
  );
};
