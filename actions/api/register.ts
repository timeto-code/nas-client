"use server";

import { RegisterDto } from "@/DTOs/UserDTOs";
import { z } from "zod";
import { postData } from "../apiService";
import { AxiosError } from "axios";

export const register = async (data: z.infer<typeof RegisterDto>) => {
  const validation = RegisterDto.safeParse(data);

  if (!validation.success) {
    const errors = validation.error.errors;
    if (errors.length > 0) return { error: errors[0].message };
    return { error: "验证失败，但没有具体的错误信息" };
  }

  try {
    await postData("/api/user/register", data);
    return { success: "注册成功" };
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.data) {
      const message = (err.response.data as { message?: string }).message;
      return { error: message ?? "注册失败，请重新尝试！" };
    }
    return { error: "注册失败，请重新尝试！" };
  }
};
