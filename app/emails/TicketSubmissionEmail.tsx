// app/emails/TicketSubmissionEmail.tsx
import React from "react";
import { Html, Head, Body, Container, Heading, Text, Section } from "@react-email/components";

const TicketSubmissionEmail = ({
  name,
  title,
  details,
  ticketId,
}: {
  name: string;
  title: string;
  details: string;
  ticketId: string;
}) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9fafb", padding: "20px" }}>
        <Container style={{ maxWidth: "600px", backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px" }}>
          <Heading style={{ color: "#333", textAlign: "center" }}>New Ticket Submitted</Heading>
          <Text>Dear Admin,</Text>
          <Text><strong>{name}</strong> has submitted a new ticket.</Text>
          <Section>
            <Text><strong>Ticket ID:</strong> {ticketId}</Text>
            <Text><strong>Title:</strong> {title}</Text>
            <Text><strong>Details:</strong></Text>
            <Text>{details}</Text>
          </Section>
          <Text style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
            Please log in to the admin dashboard to take action.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TicketSubmissionEmail;
