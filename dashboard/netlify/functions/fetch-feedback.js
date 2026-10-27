// fetch-feedback.js (Netlify function)
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

const SHEET_ID = "1qATKmt0xB3Uqmz-WtAc_jgwTi9yg1G4zjrjb48KimhA";
const SHEET_NAME = "Form Responses 1";

exports.handler = async function () {
  try {

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:ZZ`,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log("No rows found in sheet");
      return { statusCode: 200, body: JSON.stringify([]) };
    }

    const headers = rows[0];

    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = row[i] || ""; // empty if missing
      });
      return obj;
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    console.error("Error in fetch-feedback:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
