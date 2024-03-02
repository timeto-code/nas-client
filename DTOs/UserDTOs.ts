import * as z from "zod";

const LoginDto = z.object({
  username: z.string().min(3),
  password: z.string().min(6).max(20),
});

const GetUserDto = z.object({
  id: z.string().min(3).optional(),
  name: z.string().min(3).max(30).optional(),
  email: z.string().email().optional(),
});

const RegisterDto = z.object({
  name: z
    .string()
    .min(3, {
      message: "用户名至少3个字符",
    })
    .max(20, {
      message: "用户名最多20个字符",
    }),
  email: z
    .string()
    .email({
      message: "电子邮件格式不正确",
    })
    .optional(),
  password: z
    .string()
    .min(6, {
      message: "密码至少6个字符",
    })
    .max(20, {
      message: "密码最多20个字符",
    }),
});

export { GetUserDto, RegisterDto, LoginDto };
