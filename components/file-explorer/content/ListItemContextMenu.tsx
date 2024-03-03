import { deleteFile } from "@/actions/api/file";
import { deleteFolder } from "@/actions/api/folder";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import downlaod from "@/lib/download";
import { useListItemRenameStore } from "@/lib/stores/ListStore";
import { useConfirmDialogStore } from "@/lib/stores/useConfirmDialogStore";
import { useFolderStore } from "@/lib/stores/useFolderStore";
import { useToastStore } from "@/lib/stores/useToastStore";
import { File, Folder } from "@prisma/client";
import { ArchiveIcon, DownloadIcon, InputIcon } from "@radix-ui/react-icons";
import React from "react";

interface Props {
  item: File | Folder;
  contextMenu: {
    isVisible: boolean;
    position: { x: number; y: number };
  };
  setContextMenu: React.Dispatch<
    React.SetStateAction<{
      isVisible: boolean;
      position: { x: number; y: number };
    }>
  >;
}

const ListItemContextMenu = ({ contextMenu, item, setContextMenu }: Props) => {
  const isFile = "type" in item;

  const handleDubClick = (item: File | Folder) => {
    if (isFile) return;
    useFolderStore.setState({ folderId: item.id });
  };

  const handleRename = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    useListItemRenameStore.setState({ renameItemId: item.id });
    setContextMenu({ ...contextMenu, isVisible: false });
  };

  const handleDownload = async (event: React.MouseEvent) => {
    event.preventDefault();
    const file = item as File;
    await downlaod(file.link, file.name);
  };

  const openDialog = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    useConfirmDialogStore.setState({
      open: true,
      title: "删除确认",
      description: `确定删除 ${item.name} 吗？`,
      onConfirm: handleDelete,
    });
    setContextMenu({ ...contextMenu, isVisible: false });
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (isFile) {
      const file = item as File;
      const res = await deleteFile(file.id);
      if (res.error) {
        useToastStore.setState({ varient: "destructive" });
        useToastStore.setState({ description: "文件已删除" });
      } else {
        useToastStore.setState({ varient: "success" });
        useToastStore.setState({ description: "文件已删除" });
        useToastStore.setState((state) => ({ refresh: !state.refresh }));
        useFolderStore.setState((state) => ({ refresh: !state.refresh }));
      }
    } else {
      const folder = item as Folder;
      const res = await deleteFolder(folder.id);
      if (res.error) {
        useToastStore.setState({ varient: "destructive" });
        useToastStore.setState({ description: "文件夹已删除" });
        useToastStore.setState((state) => ({ refresh: !state.refresh }));
      } else {
        useToastStore.setState({ varient: "success" });
        useToastStore.setState({ description: "文件夹已删除" });
        useToastStore.setState((state) => ({ refresh: !state.refresh }));
        useFolderStore.setState((state) => ({ refresh: !state.refresh }));
      }
    }
  };

  return (
    <>
      <div
        className="absolute z-50"
        style={{
          position: "absolute",
          left: `${contextMenu.position.x}px`,
          top: `${contextMenu.position.y}px`,
        }}
        onDoubleClick={() => handleDubClick(item)}
      >
        <Command className="rounded-lg border shadow-md">
          <CommandList>
            <CommandGroup>
              <CommandItem>
                <InputIcon className="mr-2 h-4 w-4" />
                <span onClick={handleRename}>重命名</span>
              </CommandItem>
              {isFile && (
                <CommandItem>
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  <span onClick={handleDownload}>下载</span>
                </CommandItem>
              )}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <ArchiveIcon className="mr-2 h-4 w-4" />
                <span onClick={openDialog}>删除</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </>
  );
};

export default ListItemContextMenu;
