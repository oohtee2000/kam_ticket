import React from "react";
import { Html, Head, Body, Container, Heading, Text, Link, Section, Button } from "@react-email/components";

const WelcomeEmail = ({ name }: { name: string }) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f3f4f6", padding: "20px" }}>
        <Container style={{ maxWidth: "600px", backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px" }}>
          <Heading style={{ textAlign: "center", color: "#333" }}>Welcome to Our Platform!</Heading>
          <Text>Dear {name},</Text>
          <Text>We're excited to have you on board! Your account has been created successfully.</Text>
          <Section style={{ textAlign: "center", marginTop: "20px" }}>
            <Button href="https://yourapp.com/login" style={{ backgroundColor: "#007bff", padding: "10px 20px", borderRadius: "5px", color: "#fff" }}>
              Log in to Your Account
            </Button>
          </Section>
          <Text style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
            If you have any questions, feel free to <Link href="mailto:support@yourapp.com">contact our support team</Link>.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
