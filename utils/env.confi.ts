const env = {
  // JWT 配置，用于生成和验证 JWT 令牌
  JWT_SUBJECT: process.env.JWT_SUBJECT!,
  JWT_ISSUER: process.env.JWT_ISSUER!,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE!,
};

export { env };
