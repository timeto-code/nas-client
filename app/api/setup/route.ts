import { env } from "@/utils/env.confi";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const POST = async (req: NextRequest) => {
  try {
    const { serverAddress } = await req.json();
    const response = await axios.get(`${serverAddress}/connection-test`);
    const { message, url } = await response.data;
    if (message === "successful" && url) {
      const settingsPtah = path.join(
        env.PROJECT_ROOT,
        "settings",
        "settings.json"
      );

      const config = fs.readFileSync(settingsPtah, "utf-8");
      const configObj = JSON.parse(config);
      configObj["express-host"] = url;

      fs.writeFileSync(settingsPtah, JSON.stringify(configObj, null, 2));

      return NextResponse.json({}, { status: 200 });
    }
    return NextResponse.json({}, { status: 500 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const settingsPtah = path.join(env.PROJECT_ROOT, "settings", "settings.json");

  const settings = fs.readFileSync(settingsPtah, "utf-8");
  const settingsObj = JSON.parse(settings);

  return NextResponse.json({ server: settingsObj["express-host"] });
};
