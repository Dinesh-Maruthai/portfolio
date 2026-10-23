
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req) => {
  if (req.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { name, email, message } = await req.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim() ||
      name.length > 100 ||
      email.length > 254 ||
      message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return Response.json(
        { error: "Please provide valid form details." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL],
      replyTo: email.trim(),
      subject: `Portfolio message from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`
    });

    if (error) {
      console.error("Email provider error:", error);
      return Response.json(
        { error: "Unable to send your message right now." },
        { status: 502 }
      );
    }

    return Response.json({
      success: true,
      message: "Your message has been sent!"
    });
  } catch {
    return Response.json(
      { error: "Invalid request or server error." },
      { status: 400 }
    );
  }
};
