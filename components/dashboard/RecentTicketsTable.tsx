"use client";
import { useEffect, useState } from "react";
import { Table, Spin, message } from "antd";

interface Ticket {
  id: number;
  title: string;
  department: string;
  status: string;
  created_at: string;
  category: string;
  assigned_to: string | null; // In case the ticket is unassigned
}

export default function RecentTicketsTable() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecentTickets = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets/recent/latest`);
        if (!response.ok) throw new Error("Failed to fetch tickets");

        const data = await response.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
        message.error("Unable to load recent tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTickets();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Assigned To",
      dataIndex: "assigned_to",
      key: "assigned_to",
      render: (name: string | null) => name || <span style={{ color: "gray" }}>Unassigned</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "gray";
        if (status === "Pending") color = "orange";
        else if (status === "Resolved") color = "green";
        else if (status === "Unresolved") color = "red";

        return <span style={{ color, fontWeight: 500 }}>{status}</span>;
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (val: string) => new Date(val).toLocaleString(),
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Recent Tickets
      </h3>
      <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
        Overview of most recently submitted tickets
      </p>

      {loading ? (
        <div className="mt-6 text-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={tickets.map(ticket => ({ ...ticket, key: ticket.id }))}
          columns={columns}
          pagination={false}
          className="mt-4"
        />
      )}
    </div>
  );
}
