"use client";

import { CreateFolderDto } from "@/DTOs/FolderDTOs";
import { createFolder } from "@/actions/api/folder";
import { useFolderStore } from "@/lib/stores/useFolderStore";
import Image from "next/image";
import { z } from "zod";

const CreateFolderButton = () => {
  const folderId = useFolderStore((state) => state.folderId);

  const handleCreateFolder = async () => {
    const data: z.infer<typeof CreateFolderDto> = {
      name: "新建文件夹",
      parentId: folderId,
    };

    const result = await createFolder(data);
    if (result.error) {
      console.log(result.error);
    } else {
      useFolderStore.setState((state) => ({ refresh: !state.refresh }));
    }
  };

  return (
    <Image
      src="/icons/icons8-add-folder-96.png"
      alt="Create Folder"
      width={28}
      height={28}
      className="cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
      quality={100}
      onClick={handleCreateFolder}
    />
  );
};

export default CreateFolderButton;
