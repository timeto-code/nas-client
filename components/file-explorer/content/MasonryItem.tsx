import downlaod from "@/lib/download";
import { useFolderStore } from "@/lib/stores/useFolderStore";
import { File, Folder } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MasonryItemProps {
  item: File | Folder;
}

const MasonryItem = ({ item }: MasonryItemProps) => {
  const [isFile, setIsFile] = useState(false);
  const [scr, setScr] = useState("");

  useEffect(() => {
    if ("type" in item) {
      setIsFile(true);
      switch (item.type) {
        case "mp3":
        case "wav":
          setScr("/icons/audio-file.png");
          break;

        case "mp4":
        case "avi":
        case "mkv":
          setScr("/icons/video-file.png");
          break;

        case "jpg":
        case "png":
        case "jpeg":
          setScr("/icons/image-file.png");
          break;

        case "doc":
        case "docx":
          setScr("/icons/word-file.png");
          break;

        case "ppt":
        case "pdf":
          setScr("/icons/ppt-file.png");
          break;

        default:
          setScr("/icons/icons8-cloud-file-96.png");
          break;
      }
    } else {
      setScr("/icons/icons8-folder.svg");
    }
  }, [item]);

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
    <div className="w-20" onDoubleClick={handleDoubleClick}>
      <div className="flex flex-col items-center group hover:bg-[#e5f3ff]/20 p-2 transition-all duration-300 rounded-sm">
        {/* <Image
        className="cursor-pointer group-hover:scale-125 transition-all duration-300 "
        src={scr}
        alt="folder"
        width={50}
        height={50}
        priority
      /> */}
        <img
          className="cursor-pointer group-hover:scale-105 transition-all duration-300 "
          src={scr}
          alt="folder"
          width={50}
          height={50}
        />
        <p className="text-xs text-center break-all w-full group-hover:scale-105 transition-all cursor-default">
          {item.name}
        </p>
      </div>
    </div>
  );
};

export default MasonryItem;
