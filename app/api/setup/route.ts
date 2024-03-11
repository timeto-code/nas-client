import { getSettings } from "@/actions/setup/fileExplorerSetup";
import { NextResponse } from "next/server";

export const GET = async () => {
  const settings = await getSettings();

  return NextResponse.json(settings);
};
