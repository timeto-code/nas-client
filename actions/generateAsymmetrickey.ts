"use server";

import logger from "@/utils/logger";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { env } from "process";

export const generateAsymmetrickey = async () => {
  try {
    // 生成公私钥对
    const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");

    // 确保key目录存在，如果不存在则创建
    const keyDirPath = path.resolve(env.PROJECT_ROOT!, "jwt");
    await fs.mkdir(keyDirPath, { recursive: true });

    // 将公钥和私钥写入文件
    await fs.writeFile(
      process.env.ASYMMETRIC_PUBLIC_KEY!,
      publicKey.export({ type: "spki", format: "pem" })
    );
    await fs.writeFile(
      process.env.ASYMMETRIC_PRIVATE_KEY!,
      privateKey.export({ type: "pkcs8", format: "pem" })
    );

    logger.info(`新密钥已生成`);
    return { status: 200, message: "新密钥已生成" };
  } catch (error) {
    logger.error(`密钥生成失败: ${error}`);
    return { status: 500, message: "密钥生成失败" };
  }
};
