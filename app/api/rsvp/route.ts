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

    const appsScriptUrl = siteConfig.appsScriptUrl;

    if (!appsScriptUrl || appsScriptUrl.includes("YOUR_DEPLOYMENT_ID")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Google Apps Script URL is not configured. Add GOOGLE_APPS_SCRIPT_URL to your environment variables and deploy the web app in Google Apps Script."
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

    let response;
    try {
      response = await fetch(appsScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload),
        cache: "no-store"
      });
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message:
            error instanceof Error
              ? `Unable to reach the Google Apps Script endpoint: ${error.message}`
              : "Unable to reach the Google Apps Script endpoint."
        },
        { status: 502 }
      );
    }

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
          message:
            data.message ||
            `Google Apps Script returned status ${response.status}. Check that the web app is deployed and that the spreadsheet is linked correctly.`
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
