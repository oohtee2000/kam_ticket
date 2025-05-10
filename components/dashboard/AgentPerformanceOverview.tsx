'use client'
import { useState } from "react";
import { Table, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export default function AgentPerformanceOverview() {
  const agents = [
    {
      key: "1",
      name: "John Doe",
      ticketsHandled: 120,
      avgResponseTime: "2h 15m",
      resolutionRate: "92%",
      csat: "4.7/5",
    },
    {
      key: "2",
      name: "Jane Smith",
      ticketsHandled: 95,
      avgResponseTime: "3h 10m",
      resolutionRate: "88%",
      csat: "4.5/5",
    },
  ];

  const menuItems = [
    { key: "1", label: "View Details" },
    { key: "2", label: "Export Data" },
  ];

  const columns = [
    {
      title: "Agent Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tickets Handled",
      dataIndex: "ticketsHandled",
      key: "ticketsHandled",
    },
    {
      title: "Av.RT",
      dataIndex: "avgResponseTime",
      key: "avgResponseTime",
    },
    {
      title: "Resolution Rate",
      dataIndex: "resolutionRate",
      key: "resolutionRate",
    },
    {
      title: "CSAT",
      dataIndex: "csat",
      key: "csat",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button shape="circle" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Agent Performance Overview
      </h3>
      <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
        Performance metrics of support agents
      </p>
      <Table dataSource={agents} columns={columns} pagination={false} className="mt-4" />
    </div>
  );
}
