"use server";

import { CreateFolderDto, RenameFolderDto } from "@/DTOs/FolderDTOs";
import { z } from "zod";
import { deleteData, fetchData, postData, updateData } from "../apiService";

// 获取文件夹
export const getFolderById = async (id: string) => {
  try {
    return await fetchData(`/api/folder/fetch/${id}`);
  } catch (error) {
    return { error: "获取文件夹失败" };
  }
};

// 创建文件夹
export const createFolder = async (data: z.infer<typeof CreateFolderDto>) => {
  const validation = CreateFolderDto.safeParse(data);

  if (!validation.success) {
    const errors = validation.error.errors;
    if (errors.length > 0) return { error: errors[0].message };
    return { error: "验证失败，但没有具体的错误信息" };
  }

  try {
    return await postData("/api/folder/create", data);
  } catch (error) {
    return { error: "创建文件夹失败" };
  }
};

// 删除文件夹
export const deleteFolder = async (id: string) => {
  try {
    return await deleteData(`/api/folder/delete/${id}`);
  } catch (error) {
    return { error: "删除文件夹失败" };
  }
};

// 修改文件夹名
export const updateFolderNameById = async (
  data: z.infer<typeof RenameFolderDto>
) => {
  const validation = RenameFolderDto.safeParse(data);

  if (!validation.success) {
    const errors = validation.error.errors;
    if (errors.length > 0) return { error: errors[0].message };
    return { error: "验证失败，但没有具体的错误信息" };
  }

  try {
    return await updateData("/api/folder/rename", data);
  } catch (error) {
    return { error: "修改文件夹名失败" };
  }
};
