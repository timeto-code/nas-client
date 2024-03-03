"use client";

import { getFolderById } from "@/actions/api/folder";
import { useFolderStore } from "@/lib/stores/useFolderStore";
import { useRootFolderStore } from "@/lib/stores/useRootFolderStore";
import { Folder } from "@prisma/client";
import { useEffect, useState } from "react";
import styles from "@/styles/UserResources.module.scss";
import { cn } from "@/lib/utils";

const UserResources = () => {
  // 监听根文件夹 Id 状态
  const rootFolderId = useRootFolderStore((state) => state.rootFolderId);
  // 监听文件夹操作事件状态
  const folderStoreRefresh = useFolderStore((state) => state.refresh);
  // 本地状态
  const [folder, setFolder] = useState<Folder | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!rootFolderId) return;

    const fetchUserDetails = async () => {
      const result = (await getFolderById(rootFolderId)) as
        | Folder
        | { error: string };
      if ("error" in result) {
        setError(result.error);
        setFolder(null);
      } else {
        setFolder(result);
        setError("");
      }
    };

    fetchUserDetails();
  }, [rootFolderId, folderStoreRefresh]);

  return (
    <div
      className={cn(
        "absolute bottom-0 inset-x-0 h-7 w-full flex items-center justify-between pl-2",
        `${styles.shadow}`
      )}
    >
      {!rootFolderId || error ? (
        <>{/* <p className="text-xs">获取资源信息失败</p> */}</>
      ) : (
        <>
          <p className="text-xs">
            项目总数 {folder?.totalFolders! + folder?.totalFiles!} ；
          </p>
          <p className="text-xs">文件 {folder?.filesCount}；</p>
          <p className="text-xs">文件夹 {folder?.subFoldersCount}；</p>
        </>
      )}
    </div>
  );
};

export default UserResources;
