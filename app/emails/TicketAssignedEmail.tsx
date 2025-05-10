import * as React from "react";

type TicketAssignedEmailProps = {
  name: string;
  title: string;
  assignedBy: string;
  ticketId: number;
};

const TicketAssignedEmail = ({ name, title, assignedBy, ticketId }: TicketAssignedEmailProps) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "16px", color: "#333" }}>
      <h2>Hello {name},</h2>
      <p>You have been assigned a new support ticket:</p>
      <ul>
        <li><strong>Ticket ID:</strong> #{ticketId}</li>
        <li><strong>Title:</strong> {title}</li>
        <li><strong>Assigned By:</strong> {assignedBy}</li>
      </ul>
      <p>Please log into your dashboard to view more details and begin processing the ticket.</p>
      <p>Thank you!</p>
    </div>
  );
};

export default TicketAssignedEmail;
