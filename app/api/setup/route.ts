import { getSettings } from "@/actions/setup/fileExplorerSetup";
import { __root_dir } from "@/utils/root-dir";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const GET = async (req: NextRequest) => {
  const settings = await getSettings();

  return NextResponse.json(settings);
};
