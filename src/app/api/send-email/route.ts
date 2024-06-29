import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/emailer/email";

export const POST = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    const subject = `New contact form submission from Anonymous`;
    const html = `
        <h2><strong>Name:</strong> Anonymous</h2>
        <h4><strong>Message:</strong></h4>
        <h4>Liked the app!</h4>
      `;

    try {
      await sendEmail(String(process.env.EMAIL_TO), subject, html);
      return NextResponse.json({
        success: true,
        message: "Email sent successfully",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      return NextResponse.json({
        success: false,
        message: "Failed to send email",
      });
    }
  } else {
    // res.setHeader("Allow", ["POST"]);
    // res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
