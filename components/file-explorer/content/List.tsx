import { Checkbox } from "@/components/ui/checkbox";
import {
  useListItemContextMenuStore,
  useListItemRenameStore,
} from "@/lib/stores/ListStore";
import { File, Folder } from "@prisma/client";
import React, { useRef, useState } from "react";
import ListItem from "./ListItem";
import ListItemContextMenu from "./ListItemContextMenu";

const List = ({ items }: { items: (File | Folder)[] }) => {
  const [nameWidth, setNameWidth] = React.useState<number>(384);
  const [timeWidth, setTimeWidth] = React.useState<number>(200);
  const [typeWidth, setTypeWidth] = React.useState<number>(120);
  const [sizeWidth, setSizeWidth] = React.useState<number>(120);

  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedItem, setFocusedItem] = useState<File | Folder | null>(null);

  // 定义状态控制上下文菜单的显示和位置
  const [contextMenu, setContextMenu] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
  });

  // 右键点击行的事件处理函数
  const handleRightClick = (
    event: React.MouseEvent<HTMLDivElement>,
    item: File | Folder
  ) => {
    event.preventDefault(); // 阻止默认的上下文菜单
    setFocusedItem(item); // 更新当前焦点的文件或文件夹
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();

      // 更新上下文菜单的状态和位置
      setContextMenu({
        isVisible: true,
        position: { x: event.clientX - left + 15, y: event.clientY - top + 15 },
      });

      // 你的逻辑代码
      console.log(
        `Right-clicked on item with id: ${JSON.stringify(contextMenu)}`
      );
    }
  };

  // 点击其他位置关闭上下文菜单
  const handleClick = () => {
    useListItemContextMenuStore.setState({ focusedItemId: "" });
    useListItemRenameStore.setState({ renameItemId: "" });
    if (contextMenu.isVisible) {
      setContextMenu({ ...contextMenu, isVisible: false });
    }
  };

  return (
    <div ref={containerRef} className="h-full w-full" onClick={handleClick}>
      <div className="h-full w-[900px] flex flex-col gap-1 ">
        <div className="h-8 px-2 flex items-center gap-2">
          <div className="w-10">
            <Checkbox />
          </div>
          <div
            style={{
              width: `${nameWidth}px`,
            }}
            className="font-semibold"
          >
            文件名
          </div>
          <div
            className="font-semibold"
            style={{
              width: `${timeWidth}px`,
            }}
          >
            上次更新时间
          </div>
          <div
            className="font-semibold"
            style={{
              width: `${typeWidth}px`,
            }}
          >
            类型
          </div>
          <div
            className="font-semibold text-right pr-1"
            style={{
              width: `${sizeWidth}px`,
            }}
          >
            大小
          </div>
        </div>
        {items.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              nameWidth={nameWidth}
              timeWidth={timeWidth}
              typeWidth={typeWidth}
              sizeWidth={sizeWidth}
              handleRightClick={handleRightClick}
            />
          );
        })}
      </div>
      {contextMenu.isVisible && (
        <ListItemContextMenu
          contextMenu={contextMenu}
          item={focusedItem!}
          setContextMenu={setContextMenu}
        />
      )}
    </div>
  );
};

export default List;
