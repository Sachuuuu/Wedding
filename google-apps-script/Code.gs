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
