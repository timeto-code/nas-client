import { getFolderById } from "@/actions/api/folder";
import { FolderWithChildres } from "@/types/folder";
import { File as PrismaFile, Folder as PrismaFolder } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFolderStore } from "../stores/useFolderStore";

const useFetchFolder = (folderId: string) => {
  // 返回状态
  const [folder, setFolder] = useState<FolderWithChildres | null>(null);
  const [items, setItems] = useState<(PrismaFile | PrismaFolder)[]>([]);
  const [folderCount, setFolderCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [error, setError] = useState("");
  // 依赖状态
  const folderStoreRefresh = useFolderStore((state) => state.refresh);

  useEffect(() => {
    if (!folderId) {
      console.error("folderId is not provided");
      setError("folderId is not provided");
    } else {
      const fetch = async () => {
        const result = await getFolderById(folderId);
        if (result.error) {
          setError(result.error);
          setItems([]);
          setFolderCount(0);
          setFileCount(0);
        } else {
          const folder = result as FolderWithChildres;
          setFolder(folder);

          // 更新返回上一级按钮的状态
          useFolderStore.setState({ folderParentId: folder.parentId });

          // 合并文件夹和文件存入数组
          const combinedItems = [];
          if (folder.subFolders.length > 0) {
            setFolderCount(folder.subFoldersCount);
            combinedItems.push(...folder.subFolders);
          }
          if (folder.files.length > 0) {
            setFileCount(folder.filesCount);
            combinedItems.push(...folder.files);
          }
          setItems(combinedItems);
        }
      };

      fetch();
    }
  }, [folderId, folderStoreRefresh]);

  return { folder, items, folderCount, fileCount, error };
};

export default useFetchFolder;
