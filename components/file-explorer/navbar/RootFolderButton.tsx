"use client";

import React from "react";
import Image from "next/image";
import { useFolderStore } from "@/lib/stores/useFolderStore";
import { useRootFolderStore } from "@/lib/stores/useRootFolderStore";

const RootFolderButton = () => {
  const rootFolderId = useRootFolderStore((state) => state.rootFolderId);

  return (
    <Image
      className="cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
      src="/icons/icons8-file-explorer-96.png"
      width={28}
      height={28}
      alt=""
      onClick={() => {
        useFolderStore.setState({ folderId: rootFolderId });
      }}
      title="打开根文件夹"
    />
  );
};

export default RootFolderButton;
