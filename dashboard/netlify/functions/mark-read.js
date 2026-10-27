// mark-read.js
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
const SHEET_ID = "1qATKmt0xB3Uqmz-WtAc_jgwTi9yg1G4zjrjb48KimhA";
const SHEET_NAME = "Form Responses 1";

function columnToLetter(column) {
  let temp, letter = '';
  while (column >= 0) {
    temp = column % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = Math.floor(column / 26) - 1;
  }
  return letter;
}

exports.handler = async function (event) {
  try {
    const { row, unread } = JSON.parse(event.body);
    if (!row) throw new Error("Row number not provided");

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

    const headerRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!1:1`,
    });

    const headers = headerRes.data.values[0];
    let readColIndex = headers.indexOf("Read");

    if (readColIndex === -1) {
      readColIndex = headers.length;
      const colLetter = columnToLetter(readColIndex);
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!${colLetter}1`,
        valueInputOption: "RAW",
        requestBody: { values: [["Read"]] },
      });
    }

    const colLetter = columnToLetter(readColIndex);
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!${colLetter}${row}`,
      valueInputOption: "RAW",
      requestBody: { values: [[unread ? "" : "Yes"]] },
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error("Error marking as read/unread:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
