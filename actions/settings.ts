import { __root_dir } from "@/utils/root-dir";
import path from "path";
import fs from "fs";

export const publicKeyPath = path.resolve(__root_dir, "keys", "public-key.pem");
export const privateKeyPath = path.resolve(
  __root_dir,
  "keys",
  "private-key.pem"
);
export const settingsPath = path.resolve(__root_dir, "settings.json");

export const getServerUrl = () => {
  const settingsPtah = settingsPath;

  const settings = fs.readFileSync(settingsPtah, "utf-8");
  const settingsObj = JSON.parse(settings);

  return settingsObj["express-host"] as string;
};

export const jwtConfig = () => {
  const settingsPtah = settingsPath;

  const settings = fs.readFileSync(settingsPtah, "utf-8");
  const settingsObj = JSON.parse(settings);

  return {
    subject: settingsObj["jwt-subject"] as string,
    issuer: settingsObj["jwt-issuer"] as string,
    audience: settingsObj["jwt-audience"] as string,
  };
};
