import { File, Folder } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  item: File | Folder;
  width: number;
  height: number;
  className?: string;
}

const FileIcon = ({ item, height, width, className }: Props) => {
  const isFile = "type" in item;
  let src = "";

  if (isFile) {
    switch (item.type) {
      case "mp3":
      case "wav":
        src = "/icons/icons8-sheet-music-96.png";
        break;

      case "mp4":
      case "avi":
      case "mkv":
      case "mov":
      case "wmv":
      case "flv":
        src = "/icons/icons8-video-96.png";
        break;

      case "jpg":
      case "png":
      case "jpeg":
      case "gif":
      case "bmp":
      case "webp":
        src = "/icons/icons8-image-96.png";
        break;

      case "zip":
      case "rar":
      case "7z":
        src = "/icons/icons8-archive-folder-96.png";
        break;

      case "excel":
      case "xls":
      case "xlsx":
      case "csv":
        src = "/icons/icons8-excel-96.svg";
        break;

      case "word":
      case "doc":
      case "docx":
      case "odt":
      case "ott":
        src = "/icons/icons8-word-96.svg";
        break;

      case "ppt":
        src = "/icons/icons8-ppt-96.svg";
        break;

      case "pdf":
        src = "/icons/icons8-pdf-96.png";
        break;

      default:
        src = "/icons/icons8-file-96.png";
        break;
    }
  } else {
    src = "/icons/icons8-folder.svg";
  }

  return (
    <Image
      className={className}
      src={src}
      width={width}
      height={height}
      alt="img"
      priority
    />
  );
};

export default FileIcon;
