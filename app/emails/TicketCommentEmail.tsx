//emails/TicketCommentEmail.tsx

import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Link,
  Section,
  Button
} from "@react-email/components";

type TicketCommentEmailProps = {
  assigneeName: string;
  commenterName: string;
  ticketTitle: string;
  comment: string;
  ticketLink: string;
};

const TicketCommentEmail = ({
  assigneeName,
  commenterName,
  ticketTitle,
  comment,
  ticketLink
}: TicketCommentEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f3f4f6", padding: "20px" }}>
        <Container
          style={{
            maxWidth: "600px",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <Heading style={{ textAlign: "center", color: "#333" }}>
            New Comment on Your Assigned Ticket
          </Heading>

          <Text>Hi {assigneeName},</Text>

          <Text>
            <strong>{commenterName}</strong> has added a new comment to the
            ticket titled: <strong>{ticketTitle}</strong>.
          </Text>

          <Section
            style={{
              backgroundColor: "#f9fafb",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              marginTop: "15px"
            }}
          >
            <Text style={{ fontStyle: "italic", color: "#333" }}>
              "{comment}"
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              href={ticketLink}
              style={{
                backgroundColor: "#007bff",
                padding: "10px 20px",
                borderRadius: "5px",
                color: "#fff",
                textDecoration: "none"
              }}
            >
              View Ticket
            </Button>
          </Section>

          <Text style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
            If you have any questions, feel free to{" "}
            <Link href="mailto:support@yourapp.com">contact our support team</Link>.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TicketCommentEmail;
