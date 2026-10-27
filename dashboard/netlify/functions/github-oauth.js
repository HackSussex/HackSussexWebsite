exports.handler = async (event) => {
  // Log query parameters

  const code = event.queryStringParameters?.code;

  if (!code) {
    return { statusCode: 400, body: "Missing code parameter" };
  }

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  });

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: params,
    headers: { Accept: "application/json" },
  });


  const tokenJson = await tokenRes.json();

  const { access_token } = tokenJson;

  if (!access_token) {
    console.log("❌ No access token received from GitHub");
    return { statusCode: 401, body: "No access token" };
  }

  const userRes = await fetch("https://api.github.com/user", {
    headers: { Authorization: `token ${access_token}` },
  });

  const user = await userRes.json();

  if (!user.login) {
    console.log("❌ Missing user.login — token likely invalid");
    return { statusCode: 401, body: "Invalid access token" };
  }


  const collabUrl = `https://api.github.com/repos/${process.env.GITHUB_REPO}/collaborators/${user.login}`;

  const collabRes = await fetch(collabUrl, {
    headers: { Authorization: `token ${access_token}` },
  });


  if (collabRes.status !== 204) {
    console.log("❌ User is NOT a collaborator");
    return { statusCode: 403, body: "Not a collaborator" };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ access_token, user }),
  };
};
