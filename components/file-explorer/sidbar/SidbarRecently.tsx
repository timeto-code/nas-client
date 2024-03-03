"use client";

import { File, Folder } from "@prisma/client";
import { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import SidbarItem from "./SidbarItem";
import { cn } from "@/lib/utils";

const SidbarRecently = () => {
  const [showRecent, setShowRecent] = useState(false);
  const [recently, setRecently] = useState<(File | Folder)[]>([]);

  // 获取最近查看的文件夹信息，用户跳转时刷新
  useEffect(() => {}, []);

  return (
    <>
      <button
        className="appearance-none text-sm cursor-pointer px-1 py-[2px] bg-zinc-300/50 dark:bg-[#333]/50 flex items-center"
        onClick={() => {
          setShowRecent(!showRecent);
        }}
      >
        <MdChevronRight
          size={22}
          className={cn(
            "transform transition-transform duration-300",
            showRecent && "rotate-90"
          )}
        />
        <span>最近查看</span>
      </button>
      {showRecent && (
        <>
          {recently?.map((item) => (
            <SidbarItem key={item.id} item={item} />
          ))}
        </>
      )}
    </>
  );
};

export default SidbarRecently;
