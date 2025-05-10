'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Tag, Spin, message, Button, Typography, Space, Divider, Row, Col } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

const TicketDetails = ({ id }: { id: string }) => {
    const router = useRouter();
    const [ticket, setTicket] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTicket();
    }, []);

    const fetchTicket = async () => {
        try {
            const response = await fetch(`https://kam-ticket-express-api.onrender.com/api/tickets/${id}`);
            if (!response.ok) throw new Error('Ticket not found');
            const data = await response.json();
            setTicket(data);
        } catch (error) {
            message.error('Error fetching ticket');
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spin size="large" className="flex justify-center mt-10" />;
    if (!ticket) return <p className="text-center mt-10">Ticket not found.</p>;

    return (
        <div className="w-full min-h-screen p-6 bg-gray-100">
            <Row justify="center">
                <Col xs={24} sm={22} md={20} lg={16} xl={14}>
                    <Card className="shadow-lg rounded-lg">
                        <Title level={2} className="text-center mb-4">Ticket Details</Title>
                        <Divider />
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Text strong>ID:</Text>
                                <Text> {ticket.id}</Text>
                            </Col>
                            <Col span={12}>
                                <Text strong>Name:</Text>
                                <Text> {ticket.name}</Text>
                            </Col>
                            <Col span={12}>
                                <Text strong>Category:</Text>
                                <Text> {ticket.category}</Text>
                            </Col>
                            <Col span={12}>
                                <Text strong>Title:</Text>
                                <Text> {ticket.title}</Text>
                            </Col>
                            <Col span={24}>
                                <Text strong>Description:</Text>
                                <Text> {ticket.description}</Text>
                            </Col>
                            <Col span={24}>
                                <Text strong>Status:</Text>
                                <Tag color={ticket.status === 'Open' ? 'green' : ticket.status === 'Pending' ? 'orange' : 'red'}>
                                    {ticket.status}
                                </Tag>
                            </Col>
                        </Row>
                        <Divider />
                        <Row justify="space-between">
                            <Col>
                                <Link href={`/tickets/edit/${ticket.id}`}>
                                    <Button type="primary" icon={<EditOutlined />}>Edit Ticket</Button>
                                </Link>
                            </Col>
                            <Col>
                                <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>Go Back</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TicketDetails;
