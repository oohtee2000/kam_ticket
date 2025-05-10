"use client";

import React from "react";
import { Underdog } from "next/font/google";

const underdog = Underdog({ subsets: ["latin"], weight: "400" });

const page = () => {
  const formData = {
    name: "Tosin", // Replace this with dynamic form data if needed
  };

  const handleSendEmail = async () => {
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
          subject: `New Ticket Created by ${formData.name}`,
          template: "ticket_resolved",
          templateData: {
            name: formData.name,
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
  };

  return (
    <div className={underdog.className}>
      <h1>Email Trigger Page</h1>
      <button onClick={handleSendEmail} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Confirmation Email
      </button>
    </div>
  );
};

export default page;
