import fetch from "node-fetch";

export async function handler() {
  try {
    const GUILD_ID = process.env.DISCORD_GUILD_ID; 
    const WIDGET_URL = `https://discord.com/api/guilds/${GUILD_ID}/widget.json`;

    // console.log("fetching discord stats...")

    const res = await fetch(WIDGET_URL);
    if (!res.ok) throw new Error("Failed to fetch Discord widget");

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        total: data.presence_count + (data.members ? data.members.length : 0),
        online: data.presence_count,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
