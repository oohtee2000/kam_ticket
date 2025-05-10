// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Table, Tag, Spin, Button, Typography, Row, Col, Divider, Modal } from 'antd';

// const { Title, Text } = Typography;

// const TicketList = () => {
//     const [tickets, setTickets] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [retry, setRetry] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [currentTicket, setCurrentTicket] = useState<any>(null);

//     useEffect(() => {
//         fetchTickets();
//     }, [retry]);

//     const handleStatusUpdate = async () => {
//         try {
//           const response = await fetch(`https://kam-ticket-express-api.onrender.com/api/tickets/${currentTicket.id}/status`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ status: currentTicket.status }),
//           });
      
//           if (!response.ok) {
//             throw new Error('Failed to update status');
//           }
      
//           fetchTickets();
//           setModalVisible(false);
//         } catch (error) {
//           console.error('Update error:', error);
//           alert('Failed to update ticket status.');
//         }
//       };
      
      

//     const fetchTickets = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch('https://kam-ticket-express-api.onrender.com/api/tickets');
//             if (!response.ok) throw new Error('Failed to fetch tickets');
//             const data = await response.json();
//             setTickets(data);
//         } catch (error) {
//             setError('Error fetching tickets. Please try again later.');
//             console.error('Fetch error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleRetry = () => setRetry(!retry);
//     const handleRowClick = (record: any) => {
//         setCurrentTicket(record);
//         setModalVisible(true);
//     };

//     const columns = [
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             key: 'name',
//             render: (text: any) => <Text>{text}</Text>,
//         },
//         {
//             title: 'Department',
//             dataIndex: 'department',
//             key: 'department',
//             render: (text: any) => <Text>{text}</Text>,
//         },
//         {
//             title: 'Category',
//             dataIndex: 'category',
//             key: 'category',
//             render: (text: any) => <Text>{text}</Text>,
//         },
//         {
//             title: 'Title',
//             dataIndex: 'title',
//             key: 'title',
//             render: (text: any) => <Text strong>{text}</Text>,
//         },
//         {
//             title: 'Status',
//             dataIndex: 'status',
//             key: 'status',
//             render: (status: string) => (
//                 <Tag color={status === 'Unresolved' ? 'red' : status === 'Resolved' ? 'green' : 'orange'}>
//                     {status}
//                 </Tag>
//             ),
//         },
//     ];

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center w-full min-h-screen">
//                 <Spin size="large" />
//             </div>
//         );
//     }

//     return (
//         <div className="w-full min-h-screen p-6 bg-gray-50">
//             <Title level={2} className="text-center mb-6 text-primary">All Tickets</Title>
//             <Divider />
//             {error && (
//                 <div className="mb-4 text-center">
//                     <Text type="danger">{error}</Text>
//                     <div>
//                         <Button type="primary" onClick={handleRetry}>Retry</Button>
//                     </div>
//                 </div>
//             )}
//             <div className="w-full overflow-x-auto">
//                 <Table
//                     dataSource={tickets}
//                     columns={columns}
//                     rowKey="id"
//                     pagination={{ pageSize: 10 }}
//                     bordered
//                     size="middle"
//                     className="shadow-md rounded-md bg-white"
//                     onRow={(record) => ({
//                         onClick: () => handleRowClick(record),
//                     })}
//                     rowClassName="hover:bg-gray-100 cursor-pointer transition duration-200"
//                     locale={{ emptyText: 'No tickets found' }}
//                 />
//             </div>

//             {/* Modal */}
//             {/* {currentTicket && (
//                 <Modal
//                 title={`Ticket Details - ${currentTicket.title}`}
//                 open={modalVisible}
//                 onCancel={() => setModalVisible(false)}
//                 footer={null}
//                 width={700}
//                 styles={{ body: { padding: '20px' } }}
//             >
//                 <div className="space-y-4">
//                     {currentTicket.image && (
//                         <img
//                         src={currentTicket.image || '/images/no-image.png'}
//                         alt="Ticket"
//                         className="w-full h-64 object-cover rounded-md"
//                         onError={(e) => (e.currentTarget.src = '/images/no-image.png')}
//                     />
//                     )}
//                     <p><strong>Ticket ID:</strong> {currentTicket.id}</p>
//                     <p><strong>Name:</strong> {currentTicket.name}</p>
//                     <p><strong>Department:</strong> {currentTicket.department}</p>
//                     <p><strong>Category:</strong> {currentTicket.category}</p>
//                     <p><strong>Status:</strong>
//                         <Tag color={currentTicket.status === 'Unresolved' ? 'red' : currentTicket.status === 'Resolved' ? 'green' : 'orange'}>
//                             {currentTicket.status}
//                         </Tag>
//                     </p>
//                     <p><strong>Description:</strong> {currentTicket.description}</p>
            
//                     <div className="text-right">
//                         <Button onClick={() => setModalVisible(false)}>Close</Button>
//                     </div>
//                 </div>
//             </Modal>
            
//             )} */}



// {currentTicket && (
//   <Modal
//     title={`Ticket Details - ${currentTicket.title}`}
//     open={modalVisible}
//     onCancel={() => setModalVisible(false)}
//     footer={null}
//     width={700}
//     styles={{ body: { padding: '20px' } }}
//   >
//     <div className="space-y-4">
//       {currentTicket.image && (
//         <img
//           src={currentTicket.image || '/images/no-image.png'}
//           alt="Ticket"
//           className="w-full h-64 object-cover rounded-md"
//           onError={(e) => (e.currentTarget.src = '/images/no-image.png')}
//         />
//       )}
//       <p><strong>Ticket ID:</strong> {currentTicket.id}</p>
//       <p><strong>Name:</strong> {currentTicket.name}</p>
//       <p><strong>Department:</strong> {currentTicket.department}</p>
//       <p><strong>Category:</strong> {currentTicket.category}</p>

//       {/* Status with Select */}
//       <div>
//         <p><strong>Status:</strong></p>
//         <select
//           value={currentTicket.status}
//           onChange={(e) =>
//             setCurrentTicket((prev: any) => ({
//               ...prev,
//               status: e.target.value,
//             }))
//           }
//           className="border rounded-md p-2 w-full"
//         >
//           <option value="Unresolved">Unresolved</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Resolved">Resolved</option>
//         </select>
//       </div>

//       <p><strong>Description:</strong> {currentTicket.description}</p>

//       <div className="text-right space-x-2">
//         <Button onClick={() => setModalVisible(false)}>Cancel</Button>
//         <Button type="primary" onClick={handleStatusUpdate}>Save Changes</Button>
//       </div>
//     </div>
//   </Modal>
// )}

//         </div>
//     );
// };

// export default TicketList;


'use client';

import React, { useEffect, useState } from 'react';
import { Table, Tag, Spin, Button, Typography, Divider, Modal } from 'antd';
import { useAuth } from '@/hooks/useAuth'; // <--- import useAuth

const { Title, Text } = Typography;

const TicketList = () => {
  const { user, loading: authLoading } = useAuth(); // <--- useAuth hook
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<any>(null);

  useEffect(() => {
    if (!authLoading) {
      fetchTickets();
    }
  }, [retry, authLoading]);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://kam-ticket-express-api.onrender.com/api/tickets');
      if (!response.ok) throw new Error('Failed to fetch tickets');
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      setError('Error fetching tickets. Please try again later.');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleStatusUpdate = async () => {
  //   if (!currentTicket) return;
  //   try {
  //     const response = await fetch(`https://kam-ticket-express-api.onrender.com/api/tickets/${currentTicket.id}/status`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ status: currentTicket.status }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update status');
  //     }

  //     fetchTickets();
  //     setModalVisible(false);
  //   } catch (error) {
  //     console.error('Update error:', error);
  //     alert('Failed to update ticket status.');
  //   }
  // };


  const handleStatusUpdate = async () => {
    if (!currentTicket) return;
  
    try {
      const response = await fetch(`https://kam-ticket-express-api.onrender.com/api/tickets/${currentTicket.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: currentTicket.status }),
      });

  
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
  
      // ✅ Send resolved email if status is "Resolved"
      if (currentTicket.status === "Resolved") {
        try {
          const emailResponse = await fetch("/api/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sender: {
                name: "Helpdesk System",
                address: "noreply@yourdomain.com",
              },
              reciepients: [
                {
                  name: "Tosin",
                  address: "tosinolororo2000@gmail.com",
                },
              ],
              subject: `Ticket #${currentTicket.id} has been resolved`,
              template: "ticket_resolved",
              templateData: {
                name: currentTicket.name,
                title: currentTicket.title,
                ticketId: currentTicket.id,
                resolvedBy: "Support Team",
              },
            }),
          });
  
          const emailResult = await emailResponse.json();
          if (!emailResponse.ok) {
            console.error("❌ Failed to send confirmation email:", emailResult.error);
          } else {
            console.log("✅ Confirmation email sent:", emailResult);
          }
        } catch (emailError) {
          console.error("❌ Error sending confirmation email:", emailError);
        }
      }
  
      fetchTickets();
      setModalVisible(false);
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update ticket status.');
    }
  };
  

  const handleRetry = () => setRetry(!retry);
  const handleRowClick = (record: any) => {
    setCurrentTicket(record);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <Text>{text}</Text>,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (text: any) => <Text>{text}</Text>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text: any) => <Text>{text}</Text>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: any) => <Text strong>{text}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Unresolved' ? 'red' : status === 'Resolved' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
  ];

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <Title level={2} className="text-center mb-6 text-primary">All Tickets</Title>
      <Divider />
      {error && (
        <div className="mb-4 text-center">
          <Text type="danger">{error}</Text>
          <div>
            <Button type="primary" onClick={handleRetry}>Retry</Button>
          </div>
        </div>
      )}
      <div className="w-full overflow-x-auto">
        <Table
          dataSource={tickets}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered
          size="middle"
          className="shadow-md rounded-md bg-white"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          rowClassName="hover:bg-gray-100 cursor-pointer transition duration-200"
          locale={{ emptyText: 'No tickets found' }}
        />
      </div>

      {/* Ticket Modal */}
      {currentTicket && (
        <Modal
          title={`Ticket Details - ${currentTicket.title}`}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={700}
          styles={{ body: { padding: '20px' } }}
        >
          <div className="space-y-4">
            {currentTicket.image && (
              <img
                src={currentTicket.image || '/images/no-image.png'}
                alt="Ticket"
                className="w-full h-64 object-cover rounded-md"
                onError={(e) => (e.currentTarget.src = '/images/no-image.png')}
              />
            )}
            <p><strong>Ticket ID:</strong> {currentTicket.id}</p>
            <p><strong>Name:</strong> {currentTicket.name}</p>
            <p><strong>Department:</strong> {currentTicket.department}</p>
            <p><strong>Category:</strong> {currentTicket.category}</p>

            {/* Status Section */}
            <div>
              <p><strong>Status:</strong></p>
              {user?.role === 'Superadmin' ? (
                <select
                  value={currentTicket.status}
                  onChange={(e) =>
                    setCurrentTicket((prev: any) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                >
                  <option value="Unresolved">Unresolved</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              ) : (
                <Tag color={currentTicket.status === 'Unresolved' ? 'red' : currentTicket.status === 'Resolved' ? 'green' : 'orange'}>
                  {currentTicket.status}
                </Tag>
              )}
            </div>

            <p><strong>Description:</strong> {currentTicket.description}</p>

            <div className="text-right space-x-2">
              <Button onClick={() => setModalVisible(false)}>Close</Button>
              {user?.role === 'Superadmin' && (
                <Button type="primary" onClick={handleStatusUpdate}>
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TicketList;
