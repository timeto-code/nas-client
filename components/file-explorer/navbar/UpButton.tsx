"use client";

import { useFolderStore } from "@/lib/stores/useFolderStore";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";

const UpButton = () => {
  const folderParentId = useFolderStore((state) => state.folderParentId);

  const handleClick = () => {
    if (folderParentId) {
      useFolderStore.setState({ folderId: folderParentId });
    }
  };

  useEffect(() => {}, [folderParentId]);

  return (
    <Image
      src="/icons/icons8-up-96.png"
      alt="UP"
      width={22}
      height={22}
      className={cn(
        folderParentId &&
          "cursor-pointer hover:scale-110 transition duration-300 ease-in-out",
        !folderParentId && "contrast-0 cursor-not-allowed opacity-50"
      )}
      quality={100}
      onClick={handleClick}
    />
  );
};
export default UpButton;
