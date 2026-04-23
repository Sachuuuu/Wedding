import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

type RSVPRequest = {
  fullName?: string;
  // contactNumber?: string;
  guests?: number;
  attendanceStatus?: "Attending" | "Not Attending";
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RSVPRequest;

    if (
      !body.fullName ||
      // !body.contactNumber ||
      body.guests === undefined ||
      !body.attendanceStatus
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required RSVP fields." },
        { status: 400 }
      );
    }

    if (!siteConfig.appsScriptUrl || siteConfig.appsScriptUrl.includes("YOUR_DEPLOYMENT_ID")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Google Apps Script URL is not configured. Add GOOGLE_APPS_SCRIPT_URL to your environment variables."
        },
        { status: 500 }
      );
    }

    const payload = {
      fullName: body.fullName,
      // contactNumber: body.contactNumber,
      guests: body.guests,
      attendanceStatus: body.attendanceStatus,
      message: body.message || ""
    };

    const response = await fetch(siteConfig.appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    const text = await response.text();

    let data: { success?: boolean; message?: string } = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = {
        success: response.ok,
        message: text || "Unexpected response from Google Apps Script."
      };
    }

    if (!response.ok || !data.success) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to save RSVP to Google Sheet."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "RSVP submitted successfully."
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unexpected server error."
      },
      { status: 500 }
    );
  }
}
