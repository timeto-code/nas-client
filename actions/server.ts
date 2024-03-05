import { env } from "@/utils/env.confi";
import fs from "fs";
import path from "path";

const getServerUrl = () => {
  const settingsPtah = path.join(env.PROJECT_ROOT, "settings", "settings.json");

  const settings = fs.readFileSync(settingsPtah, "utf-8");
  const settingsObj = JSON.parse(settings);

  return settingsObj["express-host"] as string;
};

const server = getServerUrl() as string;

export { server };
