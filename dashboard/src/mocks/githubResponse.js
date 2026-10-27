export const githubJSON = (obj) => ({
  content: btoa(JSON.stringify(obj)),
  encoding: "base64"
});
