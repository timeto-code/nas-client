import FileIcon from "@/components/file-explorer/FileIcon";
import downlaod from "@/lib/download";
import { useFolderStore } from "@/lib/stores/useFolderStore";
import { File, Folder } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MasonryItemProps {
  item: File | Folder;
}

const MasonryItem = ({ item }: MasonryItemProps) => {
  const isFile = "type" in item;

  const handleDoubleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (isFile) {
      console.log("File");
      // 创建一个新的<a>元素
      const element = document.createElement("a");
      const file = item as File;
      await downlaod(file.link, file.name);
    } else {
      useFolderStore.setState({ folderId: item.id });
    }
  };

  return (
    <div className="w-20" title={item.name} onDoubleClick={handleDoubleClick}>
      <div className="flex flex-col items-center group hover:bg-sky-300/30 dark:hover:bg-sky-200/30 p-2 transition-all duration-300 rounded-[1px]">
        <FileIcon
          className="group-hover:scale-105 transition-all duration-300 "
          item={item}
          width={50}
          height={50}
        />
        <p className="text-xs text-center break-all w-full line-clamp-4 group-hover:scale-105 transition-all cursor-default">
          {item.name}
        </p>
      </div>
    </div>
  );
};

export default MasonryItem;
