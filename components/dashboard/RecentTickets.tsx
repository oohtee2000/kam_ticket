"use client";
import { Table, Modal, Badge } from "antd";
import { useState } from "react";
import Image from "next/image";

// TypeScript interface for tickets
interface Ticket {
  id: number;
  title: string;
  department: string;
  category: string;
  status: "Resolved" | "Open" | "Closed";
  image: string | null;
}

export default function RecentTickets() {
  // Static tickets data instead of fetching from backend
  const tickets: Ticket[] = [
    {
      id: 1,
      title: "Cannot login to account",
      department: "Support",
      category: "Login Issue",
      status: "Open",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Bug in payment gateway",
      department: "Billing",
      category: "Bug Report",
      status: "Resolved",
      image: null,
    },
    {
      id: 3,
      title: "Request for new feature",
      department: "Development",
      category: "Feature Request",
      status: "Closed",
      image: "https://via.placeholder.com/150",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const showImageModal = (image: string) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Recent Tickets</h3>

      <Table dataSource={tickets} rowKey="id" pagination={false}>
        <Table.Column title="Title" dataIndex="title" key="title" />
        <Table.Column title="Department" dataIndex="department" key="department" />
        <Table.Column title="Category" dataIndex="category" key="category" />
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
              <a href="#" onClick={(e) => {
                e.preventDefault();
                showImageModal(image);
              }}>
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
