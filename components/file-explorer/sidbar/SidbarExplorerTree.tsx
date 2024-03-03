"use client";

import { cn } from "@/lib/utils";
import { FolderWithChildres } from "@/types/folder";
import { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import SidbarItem from "./SidbarItem";
import { useFolderStore } from "@/lib/stores/useFolderStore";

const SidbarExplorerTree = () => {
  const [showExplorer, setShowExplorer] = useState(true);
  const [explorerTree, setExplorerTree] = useState<FolderWithChildres[]>([]);
  const folderStoreRefresh = useFolderStore((state) => state.refresh);

  // 获取所有资源树信息，用户DML时刷新
  useEffect(() => {}, [folderStoreRefresh]);

  return (
    <>
      <button
        className="appearance-none text-sm cursor-pointer px-1 py-[2px] bg-zinc-300/50 dark:bg-[#333]/50 flex items-center"
        onClick={() => {
          setShowExplorer(!showExplorer);
        }}
      >
        <MdChevronRight
          size={22}
          className={cn(
            "transform transition-transform duration-300",
            showExplorer && "rotate-90"
          )}
        />
        <span>资源管理器</span>
      </button>
      {showExplorer && (
        <>
          {explorerTree?.map((item) => (
            <SidbarItem key={item.id} item={item} />
          ))}
        </>
      )}
    </>
  );
};

export default SidbarExplorerTree;
