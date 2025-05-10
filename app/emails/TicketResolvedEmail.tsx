// app/emails/TicketResolvedEmail.tsx
import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
} from "@react-email/components";

const TicketResolvedEmail = ({
  name,
  title,
  ticketId,
  resolvedBy,
}: {
  name: string;
  title: string;
  ticketId: number;
  resolvedBy: string;
}) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9fafb", padding: "20px" }}>
        <Container
          style={{
            maxWidth: "600px",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Heading style={{ color: "#333", textAlign: "center" }}>
            Ticket Resolved
          </Heading>

          <Text>Hi {name},</Text>

          <Text>
            We’re writing to inform you that your support ticket has been marked as <strong>resolved</strong>.
          </Text>

          <Section>
            <Text><strong>Ticket ID:</strong> #{ticketId}</Text>
            <Text><strong>Title:</strong> {title}</Text>
            <Text><strong>Resolved By:</strong> {resolvedBy}</Text>
          </Section>

          <Text>
            If you believe the issue is not fully resolved, you may reply to this ticket or reopen it via your dashboard.
          </Text>

          <Text style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
            Thank you for using our support service.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TicketResolvedEmail;
