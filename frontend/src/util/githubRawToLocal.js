export function githubRawToLocal(rawUrl) {
  // Example rawUrl:
  // https://raw.githubusercontent.com/HackSussexP/HackSussexWebsite/main/public/config_images/events/events_6iybejp1.png

  // console.log("URL ", rawUrl);
  const marker = "/public/";
  const index = rawUrl.indexOf(marker);

  if (index === -1) return null; // Not a valid raw public URL

  // Extract everything after "/public/"
  const localPath = rawUrl.substring(index + marker.length);

  // Prepend a leading slash so it's a valid public URL
  return "/" + localPath;
}
