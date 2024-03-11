import { RenameFileDto } from "@/DTOs/FileDTOs";
import { UpdateFileNameById, deleteFile } from "@/actions/api/file";
import { deleteFolder, updateFolderNameById } from "@/actions/api/folder";
import FileIcon from "@/components/file-explorer/FileIcon";
import Spinner from "@/components/Spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import downlaod from "@/lib/download";
import {
  useListItemContextMenuStore,
  useListItemRenameStore,
} from "@/lib/stores/ListStore";
import { useConfirmDialogStore } from "@/lib/stores/useConfirmDialogStore";
import { useFolderStore } from "@/lib/stores/useFolderStore";
import { useToastStore } from "@/lib/stores/useToastStore";
import { cn } from "@/lib/utils";
import { File, Folder } from "@prisma/client";
import bytes from "bytes";
import npmDate from "date-and-time";
import Image from "next/image";
import { useState, useTransition } from "react";
import { z } from "zod";

/**
 * @description 修改日期列
 * @param param0
 * @returns
 */
const DateCell = ({ date, timeWidth }: { date: string; timeWidth: number }) => {
  const dateStr = npmDate.format(new Date(date), "YYYY-MM-DD HH:mm");
  return (
    <span
      className="truncate cursor-default"
      style={{
        width: `${timeWidth}px`,
      }}
    >
      {dateStr}
    </span>
  );
};

/**
 * @description 类型列
 * @param param0
 * @returns
 */
const TypeCell = ({
  item,
  typeWidth,
}: {
  item: File | Folder;
  typeWidth: number;
}) => {
  if ("type" in item) {
    return (
      <span
        className="uppercase cursor-default"
        style={{
          width: `${typeWidth}px`,
        }}
      >
        {item.type} 文件
      </span>
    );
  }

  return (
    <span
      className="cursor-default"
      style={{
        width: `${typeWidth}px`,
      }}
    >
      文件夹
    </span>
  );
};

/**
 * @description 大小列
 * @param param0
 * @returns
 */
const SizeCell = ({
  item,
  sizeWidth,
}: {
  item: File | Folder;
  sizeWidth: number;
}) => {
  if ("type" in item) {
    return (
      <span
        className="text-right cursor-default"
        style={{
          width: `${sizeWidth}px`,
        }}
      >
        {bytes(item.size, {
          decimalPlaces: 0,
        })}
      </span>
    );
  }

  return (
    <span
      className="text-right cursor-default"
      style={{
        width: `${sizeWidth}px`,
      }}
    >
      {item.subFoldersCount + item.filesCount} 个项目
    </span>
  );
};

/**
 * @description 文件列表
 * @param param0
 * @returns
 */
interface Props {
  item: File | Folder;
  nameWidth: number;
  timeWidth: number;
  typeWidth: number;
  sizeWidth: number;
  handleRightClick: (
    event: React.MouseEvent<HTMLDivElement>,
    item: File | Folder
  ) => void;
}

const ListItem = ({
  item,
  nameWidth,
  sizeWidth,
  timeWidth,
  typeWidth,
  handleRightClick,
}: Props) => {
  const isFile = "type" in item;
  const [isPending, startTransition] = useTransition();

  // 右键菜单
  const focusedItemId = useListItemContextMenuStore(
    (state) => state.focusedItemId
  );

  // 重命名
  const renameItemId = useListItemRenameStore((state) => state.renameItemId);
  const [newName, setNewName] = useState(item.name);
  const [renameFailed, setRenameFailed] = useState(false);

  const handleDubClick = (item: File | Folder) => {
    if (isFile) return;
    useFolderStore.setState({ folderId: item.id });
  };

  const rightClick = (
    event: React.MouseEvent<HTMLDivElement>,
    item: File | Folder
  ) => {
    handleRightClick(event, item);
    // setFocus(true);
    useListItemContextMenuStore.setState({ focusedItemId: item.id });
  };

  const handleRename = async () => {
    startTransition(async () => {
      if (isFile) {
        const data: z.infer<typeof RenameFileDto> = {
          id: item.id,
          name: newName,
        };

        const res = await UpdateFileNameById(data);
        if (res.error) {
          setRenameFailed(true);
          setNewName(item.name);
          useToastStore.setState((state) => ({ refresh: !state.refresh }));
          useToastStore.setState({ varient: "destructive" });
          useToastStore.setState({ description: res.error });
        }
      } else {
        const data: z.infer<typeof RenameFileDto> = {
          id: item.id,
          name: newName,
        };

        const res = await updateFolderNameById(data);
        if (res.error) {
          setRenameFailed(true);
          setNewName(item.name);
        }
      }
    });
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRename();
    }
  };

  return (
    <div
      title={item.name}
      className={cn(
        "group flex items-center gap-2 h-[30px] rounded-sm hover:bg-zinc-300/50 dark:hover:bg-[#34343b] px-2",
        focusedItemId === item.id && "bg-zinc-300/50 dark:bg-[#34343b]"
      )}
      onDoubleClick={() => handleDubClick(item)}
      onContextMenu={(event) => rightClick(event, item)}
    >
      <div className="flex items-center gap-2 w-auto ">
        <Checkbox />
        <FileIcon item={item} width={20} height={20} />
        {renameItemId === item.id ? (
          <>
            <Input
              className="m-0 p-0 px-1 h-7 text-base outline-none  rounded-[2px]  "
              style={{
                width: `${nameWidth}px`,
              }}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDoubleClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onBlur={handleRename}
              onKeyDown={handleEnter}
            />
            {isPending && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
          </>
        ) : (
          <div
            style={{
              width: `${nameWidth}px`,
            }}
            className="relative flex items-center justify-between group-hover:pr-24 overflow-hidden truncate cursor-default"
          >
            <span className="truncate ">{newName}</span>

            <div className="absolute right-0 inset-y-0 flex items-center gap-3">
              <RenameButton item={item} />
              {isFile && <DownloadButton item={item} />}
              <DeleteButton item={item} />
            </div>
          </div>
        )}
      </div>
      <DateCell date={`${item.updatedAt}`} timeWidth={timeWidth} />
      <TypeCell item={item} typeWidth={typeWidth} />
      <SizeCell item={item} sizeWidth={sizeWidth} />
    </div>
  );
};

const RenameButton = ({ item }: { item: File | Folder }) => {
  const handleRename = (event: React.MouseEvent) => {
    console.log("rename");

    event.preventDefault();
    event.stopPropagation();
    useListItemRenameStore.setState({ renameItemId: item.id });
  };

  return (
    <Image
      title="重命名"
      className="hidden group-hover:flex cursor-pointer"
      src="/icons/icons8-rename-96.png"
      alt="rename"
      width={20}
      height={20}
      onClick={handleRename}
    />
  );
};

const DownloadButton = ({ item }: { item: File | Folder }) => {
  return (
    <Image
      title="下载"
      className="hidden group-hover:flex cursor-pointer"
      src="/icons/icons8-download-96.png"
      alt="download"
      width={20}
      height={20}
      onClick={async () => {
        const file = item as File;
        await downlaod(file.link, file.name);
      }}
    />
  );
};

const DeleteButton = ({ item }: { item: File | Folder }) => {
  const isFile = "type" in item;

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

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    useConfirmDialogStore.setState({
      open: true,
      title: "删除确认",
      description: `确定删除 ${item.name} 吗？`,
      onConfirm: handleDelete,
    });
  };

  return (
    <Image
      title="删除"
      className="hidden group-hover:flex cursor-pointer"
      src="/icons/icons8-delete-96.png"
      alt="archive"
      width={20}
      height={20}
      onClick={handleClick}
    />
  );
};

export default ListItem;
