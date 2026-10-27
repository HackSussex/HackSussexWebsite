// fetch-drive.js (Netlify function)
const fetch = require("node-fetch");
const XLSX = require("xlsx");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

exports.handler = async function () {
  try {
    // OAuth
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const token = (await oAuth2Client.getAccessToken()).token;

    const url = `https://www.googleapis.com/drive/v3/files/${process.env.FILE_ID}?alt=media`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });

    if (!res.ok) return { statusCode: res.status, body: await res.text() };

    const buffer = Buffer.from(await res.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const headers = Object.keys(rows[0]);

    const hackathonColumns = headers.filter(h => /hackathon|hack/i.test(h));
    const gameJamColumns = headers.filter(h => /game\s*jam|jam/i.test(h));

    const EVENT_GROUPS = {
      Hackathons: hackathonColumns,
      GameJams: gameJamColumns
    };

    const result = {
      Hackathons: {},
      GameJams: {}
    };

    const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/;

    rows.forEach(row => {
        const genderField = row["Gender"] || row["__EMPTY_1"];
        if (!genderField || genderField.trim() === "") return;
        const gender = ["Male", "Female"].includes(genderField) ? genderField : "Other";

        Object.keys(EVENT_GROUPS).forEach(groupName => {
            EVENT_GROUPS[groupName].forEach(event => {
            const cell = row[event];
            const yearMatch = event.match(/(20\d{2}|\d{2})/);
            if (!yearMatch) return;
            let year = yearMatch[0];
            if (year.length === 2) year = "20" + year;

            if (!result[groupName][year]) {
                result[groupName][year] = {
                signedUp: 0,
                checkedIn: 0,
                gender: { Male: 0, Female: 0, Other: 0 }
                };
            }
            if (cell && cell.toString().trim() !== "") {
                result[groupName][year].signedUp++;
            }

            if (typeof cell === "string" && timestampRegex.test(cell)) {
                result[groupName][year].checkedIn++;
                result[groupName][year].gender[gender]++;
            }
            });
        });
    });


    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: { "Content-Type": "application/json" }
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
