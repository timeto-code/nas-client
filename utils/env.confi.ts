const env = {
  NEXT_PUBLIC_EXPRESS_HOST: process.env.NEXT_PUBLIC_EXPRESS_HOST!,
  // 项目根目录
  PROJECT_ROOT: process.env.PROJECT_ROOT!,
  // 非对称加密密钥路径
  ASYMMETRIC_PRIVATE_KEY: process.env.ASYMMETRIC_PRIVATE_KEY!,
  ASYMMETRIC_PUBLIC_KEY: process.env.ASYMMETRIC_PUBLIC_KEY!,
  // JWT 配置，用于生成和验证 JWT 令牌
  JWT_SUBJECT: process.env.JWT_SUBJECT!,
  JWT_ISSUER: process.env.JWT_ISSUER!,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE!,
  JWT_PAYLOAD_KEY: process.env.JWT_PAYLOAD_KEY!,
};

export { env };
