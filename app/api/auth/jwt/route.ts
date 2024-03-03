import { getKeys } from "@/actions/jwt/KeyManager";
import generateJWT from "@/actions/jwt/generateJWT";
import logger from "@/utils/logger";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // 异步操作：获取keys
    const { privateKey, publicKey } = await getKeys();

    // 检查keys是否有效
    if (!privateKey || !publicKey) {
      logger.error("密钥丢失");
      return NextResponse.json({ error: "Keys are missing" }, { status: 500 });
    }

    // 异步操作：生成JWT
    const jwt = await generateJWT(privateKey);

    // 检查JWT是否有效
    if (!jwt) {
      logger.error("JWT 生成失败");
      return NextResponse.json(
        { error: "JWT generation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ jwt }, { status: 200 });
  } catch (error) {
    logger.error(`JWT 生成失败: ${error}`);
    return NextResponse.json({ error }, { status: 500 });
  }
};
