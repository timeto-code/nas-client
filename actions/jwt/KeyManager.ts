import { env } from "@/utils/env.confi";
import logger from "@/utils/logger";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

// 生成密钥对
const generateKey = async () => {
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
  } catch (error) {
    logger.error(`生成密钥失败: ${error}`);
  }
};

// 检查并在需要时生成密钥对
const checkAndGenerateKeysIfNeeded = async () => {
  try {
    // 检查公钥和私钥文件是否存在
    await fs.access(env.ASYMMETRIC_PUBLIC_KEY!);
    await fs.access(env.ASYMMETRIC_PRIVATE_KEY!);
  } catch (error) {
    // 生成密钥对
    await generateKey();
  }
};

// 获取密钥对
const getKeys = async () => {
  try {
    // 检查并在需要时生成密钥对
    await checkAndGenerateKeysIfNeeded();

    // 读取公钥和私钥文件内容
    const publicKeyPem = await fs.readFile(
      process.env.ASYMMETRIC_PUBLIC_KEY!,
      "utf8"
    );
    const privateKeyPem = await fs.readFile(
      process.env.ASYMMETRIC_PRIVATE_KEY!,
      "utf8"
    );

    // 创建公钥和私钥对象
    const publicKey = crypto.createPublicKey(publicKeyPem);
    const privateKey = crypto.createPrivateKey(privateKeyPem);

    return { publicKey, privateKey };
  } catch (error) {
    logger.error(`Failed to get keys: ${error}`);
    return { publicKey: null, privateKey: null };
  }
};

export { getKeys };
