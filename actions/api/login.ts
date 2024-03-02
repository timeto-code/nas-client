"use server";

import { LoginDto } from "@/DTOs/UserDTOs";
import { signIn } from "@/auth";
import logger from "@/lib/logger";
import { AuthError } from "next-auth";
import { z } from "zod";
import { postData } from "../apiService";

export const login = async (data: z.infer<typeof LoginDto>) => {
  const validation = LoginDto.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.errors;
    if (errors.length > 0) return { error: errors[0].message };
    return { error: "验证失败，但没有具体的错误信息" };
  }

  // 服务器端进行用户验证
  try {
    await postData("/api/user/login", data);
  } catch (error) {
    return { error: "用户名或密码无效" };
  }

  const { username, password } = data;

  // 这里也可以做身份身份验证，但是详细验证错误信息不知道怎么返回
  // 所以在 action 中做验证，返回错误信息
  // 在 authjs 只获取用户信息用来生成token
  try {
    await signIn("credentials", {
      username,
      password,
      // 这里的重定向有点问题，当使用重定向时会报错，并且必须在catch中抛出错误，否则无法跳转
      // redirectTo: "/file-explorer",
      // 由于无法使用重定向，所以要标记为false，然后在页面中进行跳转
      redirect: false,
    });
  } catch (error) {
    console.log("in error");
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          logger.error("密码错误");
          break;
        case "AuthorizedCallbackError":
          logger.error("登录跳转失败或禁止");
          break;

        default:
          logger.error(`未知错误: ${error.type} ${error.message}`);
          break;
      }
    }

    // throw error;
    return {
      error: "请检查您的用户名和密码。或者联系管理员。",
    };
  }
};
