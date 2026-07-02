const SHEET_NAME = "RSVP Responses";
const SPREADSHEET_ID_KEY = "SPREADSHEET_ID";

function doPost(e) {
  return handleRequest_(e);
}

function doGet() {
  return jsonResponse_({
    success: true,
    message: "RSVP endpoint is running."
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

    const data = parsePayload_(e);
    const fullName = safeString_(data.fullName);
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

function parsePayload_(e) {
  let data = {};

  if (e && e.postData && e.postData.contents) {
    try {
      data = JSON.parse(e.postData.contents);
    } catch (error) {
      try {
        data = JSON.parse(decodeURIComponent(e.postData.contents));
      } catch (parseError) {
        data = {};
      }
    }
  }

  if (e && e.parameter && Object.keys(e.parameter).length > 0) {
    data = Object.assign({}, data, e.parameter);
  }

  return data;
}

function getSheet_() {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Timestamp",
      "Full Name",
      "Number of Guests",
      "Attendance Status",
      "Message"
    ]);
  }

  return sheet;
}

function getSpreadsheet_() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const spreadsheetId = scriptProperties.getProperty(SPREADSHEET_ID_KEY);

  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  return SpreadsheetApp.getActiveSpreadsheet();
}

function safeString_(value) {
  return value === undefined || value === null ? "" : String(value).trim();
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
