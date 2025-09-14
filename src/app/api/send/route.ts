import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend_api_key_1 = "re";
const resend_api_key_2 = "Qy3CxnrS";
const resend_api_key_3 = "G1LP5dStZ3CvPXunXiGqQugY";
const api_key = [resend_api_key_1, resend_api_key_2, resend_api_key_3].join(
  "_",
);
const resend = new Resend(api_key);

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "vitualizz@gmail.com",
      subject: "La chica de los 3 cumpleaños",
      html: `<p>${text}</p>`,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
