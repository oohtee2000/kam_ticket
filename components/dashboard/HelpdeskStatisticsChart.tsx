"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { ApexOptions } from "apexcharts";

// Dynamic import of ReactApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function HelpdeskStatisticsChart() {
  const [chartType, setChartType] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [categories, setCategories] = useState<string[]>([]);
  const [opened, setOpened] = useState<number[]>([]);
  const [resolved, setResolved] = useState<number[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const openedRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets/metrics/time-distribution?type=${chartType}`
        );
        const resolvedRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets/metrics/time-distribution?type=${chartType}&status=resolved`
        );

        const formatLabel = (item: any) => {
          if (chartType === "monthly") return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][item.month - 1]} ${item.year}`;
          if (chartType === "quarterly") return `Q${item.quarter} ${item.year}`;
          return `${item.year}`;
        };

        setCategories(openedRes.data.map(formatLabel));
        setOpened(openedRes.data.map((i: any) => i.ticketCount));
        setResolved(resolvedRes.data.map((i: any) => i.ticketCount));
      } catch (err) {
        console.error("Failed to fetch chart data", err);
      }
    };

    fetchChartData();
  }, [chartType]);

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 310,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    stroke: {
      curve: "smooth",
      width: [2, 2],
    },
    colors: ["#FF5733", "#00A76F"],
    markers: {
      size: 4,
      strokeColors: "#fff",
      hover: { size: 6 },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    tooltip: {
      y: { formatter: (val: number) => `${val} Tickets` },
    },
    xaxis: {
      categories,
      type: "category",
    },
    yaxis: {
      title: {
        text: "Tickets",
        style: { fontSize: "14px" },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    dataLabels: { enabled: false },
  };

  const series = [
    { name: "Tickets Opened", data: opened },
    { name: "Tickets Resolved", data: resolved },
  ];

  return (
    <div className="rounded-2xl border p-5 bg-white dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Helpdesk Statistics</h3>
          <p className="text-sm text-gray-500">Overview of opened and resolved tickets</p>
        </div>
        <select
          className="border p-1 rounded text-sm"
          value={chartType}
          onChange={(e) => setChartType(e.target.value as any)}
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px] xl:min-w-full">
          <ReactApexChart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
