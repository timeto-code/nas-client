import fs from "fs";
import path from "path";

const getServerUrl = () => {
  const settingsPtah = path.join(__dirname, "settings", "settings.json");

  const settings = fs.readFileSync(settingsPtah, "utf-8");
  const settingsObj = JSON.parse(settings);

  return settingsObj["express-host"] as string;
};

const server = getServerUrl() as string;

export { server };
