import logger from "@/utils/logger";
import crypto from "crypto";
import fs from "fs/promises";
import { SignJWT } from "jose";
import { Session } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import { jwtConfig, privateKeyPath, publicKeyPath } from "./settings";

// 转换密钥
const convertKeys = async () => {
  try {
    // 检查密钥文件是否存在
    await fs.access(publicKeyPath);
    await fs.access(privateKeyPath);
  } catch (error) {
    logger.error(`密钥文件不存在: ${error}`);
    throw new Error("密钥文件不存在");
  }

  try {
    // 读取公钥和私钥文件内容
    const publicKeyPem = await fs.readFile(publicKeyPath, "utf8");
    const privateKeyPem = await fs.readFile(privateKeyPath, "utf8");

    // 创建公钥和私钥对象
    const publicKey = crypto.createPublicKey(publicKeyPem);
    const privateKey = crypto.createPrivateKey(privateKeyPem);

    return { publicKey, privateKey };
  } catch (error) {
    logger.error(`密钥转换失败: ${error}`);
    throw new Error("密钥转换失败");
  }
};

// 签发JWT
const generateJWT = async (session: Session | null) => {
  try {
    const { subject, issuer, audience } = jwtConfig();
    const { privateKey } = await convertKeys();
    const payload = { id: session?.user?.id ?? "anonymous" };
    const jwt = await new SignJWT({ ...payload })
      // 设置保护头
      .setProtectedHeader({
        alg: "EdDSA",
        typ: "JWT",
      })
      // 设置主题
      .setSubject(subject)
      // 设置签发时间
      .setIssuedAt()
      // 设置签发者
      .setIssuer(issuer)
      // 设置接收者
      .setAudience(audience)
      // 设置过期时间为3分钟
      .setExpirationTime("10 minute")
      // 设置JWT ID
      .setJti(uuidv4())
      // 设置开始生效时间1小时后
      // .setNotBefore("1h")
      // 签名
      .sign(privateKey);

    return jwt;
  } catch (error) {
    logger.error(`JWT 生成失败: ${error}`);
    return null;
  }
};

export default generateJWT;
