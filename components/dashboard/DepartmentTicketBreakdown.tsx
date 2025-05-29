'use client'
import { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "@components/ui/dropdown/Dropdown";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "@components/ui/dropdown/DropdownItem";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DepartmentTicketBreakdown() {
  // Static data instead of fetch
  const staticData = [
    { department: "IT", ticketCount: 45 },
    { department: "HR", ticketCount: 30 },
    { department: "Finance", ticketCount: 25 },
    { department: "Marketing", ticketCount: 20 },
    { department: "Operations", ticketCount: 15 },
  ];

  const [series] = useState([{ name: "Tickets", data: staticData.map(d => d.ticketCount) }]);
  const [categories] = useState(staticData.map(d => d.department));
  const [isOpen, setIsOpen] = useState(false);

  const options: ApexOptions = {
    chart: { type: "bar", height: 330, fontFamily: "Outfit, sans-serif" },
    plotOptions: { bar: { horizontal: true, barHeight: "60%", borderRadius: 4 } },
    colors: ["#465FFF"],
    dataLabels: { enabled: false },
    xaxis: { categories },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Department Ticket Breakdown</h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">Number of tickets per department</p>
          </div>
          <div className="relative inline-block">
            <button onClick={() => setIsOpen(!isOpen)} className="dropdown-toggle">
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
            <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-40 p-2">
              <DropdownItem onItemClick={() => setIsOpen(false)} className="hover:bg-gray-100">View More</DropdownItem>
              <DropdownItem onItemClick={() => setIsOpen(false)} className="hover:bg-gray-100">Export Data</DropdownItem>
            </Dropdown>
          </div>
        </div>
        <div className="relative mt-5">
          <ReactApexChart options={options} series={series} type="bar" height={330} />
        </div>
      </div>
    </div>
  );
}
