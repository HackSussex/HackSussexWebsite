import fs from "fs";
import { google } from "googleapis";

// one time use function for setting up OAuth

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000";
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const code = ""; // put google auth code here bro

async function getTokens() {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    fs.writeFileSync("tokens.json", JSON.stringify(tokens, null, 2));
  } catch (err) {
    console.error("Error retrieving access token", err);
  }
}

getTokens();