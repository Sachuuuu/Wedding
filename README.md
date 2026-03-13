# Buddhimanthi & Mahinsa Wedding Website

A production-ready romantic wedding invitation website built with:

- Next.js 14 App Router
- React
- Tailwind CSS
- Framer Motion
- Google Apps Script integration for RSVP saving to Google Sheets
- Deployable to Vercel

## Local development

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## Environment variables

```bash
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Assets

Replace placeholder images in `/public/images` and add your background piano file in:

```text
/public/audio/piano-placeholder.mp3
```

## Configure wedding details

Edit:

```text
/lib/config.ts
```

Update:
- names
- wedding date
- venue
- ceremony / reception times
- dress code

## RSVP flow

Frontend form submits to:

```text
/app/api/rsvp/route.ts
```

That endpoint forwards the request to your Google Apps Script Web App URL, which appends the RSVP row into your Google Sheet.

## Google Apps Script

Create a Google Apps Script project and use this code:

```javascript
const SHEET_NAME = "RSVP Responses";

function doPost(e) {
  return handleRequest_(e);
}

function doGet() {
  return jsonResponse_({
    success: true,
    message: "Wedding RSVP endpoint is running."
  });
}

function handleRequest_(e) {
  try {
    const sheet = getSheet_();

    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse_({
        success: false,
        message: "No POST body received."
      });
    }

    const data = JSON.parse(e.postData.contents);

    const fullName = safeString_(data.fullName);
    const contactNumber = safeString_(data.contactNumber);
    const guests = Number(data.guests);
    const attendanceStatus = safeString_(data.attendanceStatus);
    const message = safeString_(data.message);

    if (!fullName || !contactNumber || isNaN(guests) || !attendanceStatus) {
      return jsonResponse_({
        success: false,
        message: "Missing required fields."
      });
    }

    sheet.appendRow([
      new Date(),
      fullName,
      contactNumber,
      guests,
      attendanceStatus,
      message
    ]);

    return jsonResponse_({
      success: true,
      message: "RSVP saved successfully."
    });
  } catch (error) {
    return jsonResponse_({
      success: false,
      message: error && error.message ? error.message : "Unknown server error."
    });
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Timestamp",
      "Full Name",
      "Contact Number",
      "Number of Guests",
      "Attendance Status",
      "Message"
    ]);
  }

  return sheet;
}

function safeString_(value) {
  return value === undefined || value === null ? "" : String(value).trim();
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```
