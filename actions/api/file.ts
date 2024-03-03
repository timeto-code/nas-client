"use server";

import { RenameFileDto } from "@/DTOs/FileDTOs";
import { z } from "zod";
import { deleteData, updateData } from "../apiService";

const UpdateFileNameById = async (data: z.infer<typeof RenameFileDto>) => {
  const validation = RenameFileDto.safeParse(data);

  if (!validation.success) {
    const errors = validation.error.errors;
    if (errors.length > 0) return { error: errors[0].message };
    return { error: "验证失败，但没有具体的错误信息" };
  }

  try {
    return await updateData(`/api/file/rename`, data);
  } catch (error) {
    return { error: "修改文件名失败" };
  }
};

// 删除文件夹
export const deleteFile = async (id: string) => {
  try {
    return await deleteData(`/api/file/delete/${id}`);
  } catch (error) {
    return { error: "文件删除失败" };
  }
};

export { UpdateFileNameById };
