import { KeyObject } from "crypto";
import { SignJWT } from "jose";
import { v4 as uuidv4 } from "uuid";
import logger from "@/utils/logger";
import { env } from "@/utils/env.confi";

// 签发JWT
const generateJWT = async (privateKey: KeyObject) => {
  try {
    const payload = { id: env.JWT_PAYLOAD_KEY };
    const jwt = await new SignJWT({ ...payload })
      // 设置保护头
      .setProtectedHeader({
        alg: "EdDSA",
        typ: "JWT",
      })
      // 设置主题
      .setSubject(env.JWT_SUBJECT)
      // 设置签发时间
      .setIssuedAt()
      // 设置签发者
      .setIssuer(env.JWT_ISSUER)
      // 设置接收者
      .setAudience(env.JWT_AUDIENCE)
      // 设置过期时间为30秒
      .setExpirationTime("30s")
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
