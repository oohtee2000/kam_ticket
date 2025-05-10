"use client";
import { Table, Modal, Badge, Spin, Alert } from "antd";
import { useState, useEffect } from "react";
import Image from "next/image";

// TypeScript interface for tickets
interface Ticket {
  id: number;
  title: string;
  department: string;
  category: string;  // Changed from priority to category
  status: "Resolved" | "Open" | "Closed";
  image: string | null;
}

export default function RecentTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const fetchRecentTickets = async () => {
    try {
      const response = await fetch("https://kam-ticket-express-api.onrender.com/api/tickets/recent/latest");
      if (!response.ok) throw new Error("Failed to fetch recent tickets");
      const data = await response.json();
      setTickets(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentTickets();
  }, []);

  const showImageModal = (image: string) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  if (loading) return <Spin tip="Loading recent tickets..." />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Recent Tickets</h3>

      <Table dataSource={tickets} rowKey="id" pagination={false}>
        <Table.Column title="Title" dataIndex="title" key="title" />
        <Table.Column title="Department" dataIndex="department" key="department" />
        <Table.Column title="Category" dataIndex="category" key="category" /> {/* Replaced priority with category */}
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status: string) => (
            <Badge
              color={status === "Resolved" ? "green" : status === "Open" ? "orange" : "red"}
              text={status}
            />
          )}
        />
        <Table.Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(image: string | null) =>
            image ? (
              <a href="#" onClick={() => showImageModal(image)}>
                <Image
                  src={image}
                  alt="Ticket"
                  width={50}
                  height={50}
                  className="cursor-pointer"
                />
              </a>
            ) : (
              "No Image"
            )
          }
        />
      </Table>

      <Modal
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        centered
      >
        <Image
          src={selectedImage}
          alt="Ticket"
          layout="responsive"
          width={700}
          height={500}
        />
      </Modal>
    </div>
  );
}
