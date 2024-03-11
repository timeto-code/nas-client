"use server";

import logger from "@/utils/logger";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

export const publicKeyPath = path.resolve(__dirname, "keys", "public-key.pem");
export const privateKeyPath = path.resolve(
  __dirname,
  "keys",
  "private-key.pem"
);

export const generateAsymmetrickey = async () => {
  try {
    // 生成公私钥对
    const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");

    // 确保key目录存在，如果不存在则创建
    const keyDirPath = path.resolve(__dirname, "keys");
    await fs.mkdir(keyDirPath, { recursive: true });

    // 将公钥和私钥写入文件
    await fs.writeFile(
      publicKeyPath,
      publicKey.export({ type: "spki", format: "pem" })
    );
    await fs.writeFile(
      privateKeyPath,
      privateKey.export({ type: "pkcs8", format: "pem" })
    );

    logger.info(`新密钥已生成`);
    return { status: 200, message: "新密钥已生成" };
  } catch (error) {
    logger.error(`密钥生成失败: ${error}`);
    return { status: 500, message: "密钥生成失败" };
  }
};
