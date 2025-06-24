"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MonthlyTicketsChartTemplate() {
  const [monthlyData, setMonthlyData] = useState<number[]>(new Array(12).fill(0)); // default 12 months
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets/metrics/monthly-resolved`);
        const data = await res.json();

        // Initialize all 12 months with 0
        const resolvedPerMonth = new Array(12).fill(0);

        data.forEach((item: any) => {
          const monthIndex = item.month - 1; // JS months are 0-indexed
          resolvedPerMonth[monthIndex] = item.resolvedCount;
        });

        setMonthlyData(resolvedPerMonth);
      } catch (error) {
        console.error("Failed to fetch monthly data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, []);

  const options: ApexOptions = {
    colors: ["#00A76F"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: { text: "Resolved Tickets" },
    },
    grid: {
      yaxis: { lines: { show: true } },
    },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (val: number) => `${val} Tickets`,
      },
    },
  };

  const series = [
    {
      name: "Tickets Resolved",
      data: monthlyData,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Monthly Tickets
        </h3>
        <div className="relative inline-block">
          <button className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown isOpen={false} onClose={() => {}} className="w-40 p-2">
            <DropdownItem onItemClick={() => {}}>View Details</DropdownItem>
            <DropdownItem onItemClick={() => {}}>Export Data</DropdownItem>
          </Dropdown>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading chart...</p>
      ) : (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={180}
            />
          </div>
        </div>
      )}
    </div>
  );
}
