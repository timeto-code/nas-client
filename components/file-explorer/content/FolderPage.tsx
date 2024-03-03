"use client";

import { useEffect, useRef, useState } from "react";
import DetailBar from "../DetailBar";
import List from "./List";
import Masonry from "./Masonry";
import useFetchFolder from "@/lib/hooks/useFetchFolder";
import { useFolderStore } from "@/lib/stores/useFolderStore";
import { useNavbarStore } from "@/lib/stores/useNavbarStore";
import { useRootFolderStore } from "@/lib/stores/useRootFolderStore";

interface Props {
  user: any;
}

const FolderPage = ({ user }: Props) => {
  const folderId = useFolderStore((state) => state.folderId);
  // 存储 Masonry 容器宽度
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  // 切换展示模式
  const isTablet = useNavbarStore((state) => state.isTablet);

  const { error, folder, items, fileCount, folderCount } = useFetchFolder(
    folderId === "" ? user?.rootFolderId! : folderId
  );

  // 获取 Masonry 容器宽度
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    useRootFolderStore.setState({ rootFolderId: user.rootFolderId });
    useFolderStore.setState({ folderId: user.rootFolderId });
  }, [user]);

  if (!user) {
    return null;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div className="h-full w-full pb-7">
      <div
        ref={containerRef}
        className="h-full mr-[2px] p-4 w-full relative overflow-auto"
      >
        {isTablet ? (
          <List items={items} />
        ) : (
          <Masonry containerWith={width} items={items} />
        )}
      </div>
      <div className="absolute bottom-0 inset-x-0 h-7">
        <DetailBar folderCount={folderCount} fileCount={fileCount}>
          <p className="text-xs">用户 {user?.name}；</p>
          <p className="text-xs">
            路径 {folder?.name.includes("root") ? "主文件夹" : folder?.name}；
          </p>
        </DetailBar>
      </div>
    </div>
  );
};

export default FolderPage;
