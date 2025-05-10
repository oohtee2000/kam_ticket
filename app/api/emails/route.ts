import { NextResponse } from "next/server";
import { sendEmail } from "@/app/utils/mail.utils";


export async function POST(req: Request) {
  try {
    const { sender, reciepients, subject, message, template, templateData } = await req.json();

    if (!sender || !reciepients || !subject || (!message && !template)) {
      return NextResponse.json({ success: false, error: "Missing required email fields" }, { status: 400 });
    }

    const response = await sendEmail({ sender, reciepients, subject, message, template, templateData });

    return NextResponse.json({ success: true, message: "Email sent!", response });
 } catch (error) {
  const err = error as Error; // Cast to Error
  return NextResponse.json({ success: false, error: err.message }, { status: 500 });
}

}
