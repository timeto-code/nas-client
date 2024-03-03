import { cn } from "@/lib/utils";
import styles from "@/styles/DetailBar.module.scss";
import React from "react";

interface DetailBarProps {
  folderCount: number;
  fileCount: number;
  className?: string;
  children?: React.ReactNode;
}

const DetailBar = ({
  fileCount,
  folderCount,
  className,
  children,
}: DetailBarProps) => {
  return (
    <div
      className={cn(
        `flex items-center justify-end h-7 min-w-[500px] gap-3 pl-4 pr-2 ${styles.shadow}`,
        className
      )}
    >
      {children}
      <p className="text-xs">文件夹 {folderCount}；</p>
      <p className="text-xs">文件 {fileCount}；</p>
      <p className="text-xs">项目总数 {fileCount + folderCount}；</p>
    </div>
  );
};

export default DetailBar;
