//utils/mail.utils.tsx

import { render } from "@react-email/render";
import React from "react"; // Ensure React is imported for JSX
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import WelcomeEmail from "../emails/WelcomeEmail"; // Ensure correct path
import TicketSubmissionEmail from "../emails/TicketSubmissionEmail"; // Import the new component
import TicketAssignedEmail from "../emails/TicketAssignedEmail"; 
import TicketResolvedEmail from "../emails/TicketResolvedEmail";
import TicketCommentEmail from "../emails/TicketCommentEmail";


// Nodemailer transport setup
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.NODE_ENV !== "development",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
} as SMTPTransport.Options);

type SendEmailDto = {
  sender: Mail.Address;
  reciepients: Mail.Address[];
  subject: string;
  message?: string;
  template?: "welcome" | "ticket_submission" | "ticket_assigned" | "ticket_resolved" |"ticket_comment";
  templateData?: Record<string, any>;
};

export const sendEmail = async (dto: SendEmailDto) => {
  try {
    const { sender, reciepients, subject, message, template, templateData } = dto;

    let htmlContent = message || "";

    if (template === "welcome" && templateData) {
      htmlContent = await render(<WelcomeEmail name={templateData?.name || "User"} />);
      console.log("Generated Email HTML:", htmlContent);
    }

    
if (template === "ticket_submission" && templateData) {
  const { name, title, details, ticketId } = templateData;
  htmlContent = await render(
    <TicketSubmissionEmail
      name={name}
      title={title}
      details={details}
      ticketId={ticketId}
    />
  );
}


if (template === "ticket_assigned" && templateData) {
  const { name, title, assignedBy, ticketId } = templateData;
  htmlContent = await render(
    <TicketAssignedEmail
      name={name}
      title={title}
      assignedBy={assignedBy}
      ticketId={ticketId}
    />
  );
}


    // ✅ Handle ticket resolved template
    if (template === "ticket_resolved" && templateData) {
      const { name, title, ticketId, resolvedBy } = templateData;
      htmlContent = await render(
        <TicketResolvedEmail name={name} title={title} ticketId={ticketId} resolvedBy={resolvedBy} />
      );
    }

    if (template === "ticket_comment" && templateData) {
  const { assigneeName, commenterName, ticketTitle, comment, ticketLink } = templateData;
  htmlContent = await render(
    <TicketCommentEmail
      assigneeName={assigneeName}
      commenterName={commenterName}
      ticketTitle={ticketTitle}
      comment={comment}
      ticketLink={ticketLink}
    />
  );
}


    console.log("📤 Sending email to:", reciepients.map(r => `"${r.name}" <${r.address}>`).join(", "));

    const result = await transport.sendMail({
      from: `"${sender.name}" <${sender.address}>`,
      to: reciepients.map(r => `"${r.name}" <${r.address}>`).join(", "),
      subject: subject,
      html: htmlContent,
      text: htmlContent.replace(/<\/?[^>]+(>|$)/g, ""),
    });

    console.log("✅ Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

// Test WelcomeEmail rendering
const testEmailHtml = render(<WelcomeEmail name="Test User" />);
console.log("Test Rendered HTML:", testEmailHtml);
