import { File, Folder } from "@prisma/client";
// import { useEffect, useState } from "react";
// import Masonry from "react-masonry-css";
import "@/styles/masonry.scss";
import Item from "./MasonryItem";

interface MasonryProps {
  containerWith: number;
  items: (File | Folder)[];
}

// interface BreakpointColumns {
//   default: number;
//   [key: number]: number; // 使用索引签名来表示可以有任意多的数值键
// }

const Masonry = ({ items, containerWith }: MasonryProps) => {
  // const [columnsObj, setColumnsObj] = useState<BreakpointColumns | null>(null);

  // 根据容器宽度动态计算列数
  // useEffect(() => {
  //   if (containerWith) {
  //     const breakpointColumnsObj = {
  //       default: 7,
  //       688: Math.floor(containerWith / 100),
  //       1024: Math.floor(containerWith / 100),
  //       1360: Math.floor(containerWith / 100),
  //       1696: Math.floor(containerWith / 100),
  //       2032: Math.floor(containerWith / 100),
  //       2368: Math.floor(containerWith / 100),
  //       2704: Math.floor(containerWith / 100),
  //       3040: Math.floor(containerWith / 100),
  //       3376: Math.floor(containerWith / 100),
  //     };
  //     setColumnsObj(breakpointColumnsObj);
  //   }
  // }, [containerWith, items]);

  // 确保列数已经计算完成
  // if (!columnsObj) {
  //   return null;
  // }

  return (
    // <Masonry
    //   breakpointCols={columnsObj}
    //   className="my-masonry-grid"
    //   columnClassName="my-masonry-grid_column"
    // >
    //   {items.map((item) => (
    //     <Item key={item.id} item={item} />
    //   ))}
    // </Masonry>
    <div className="masonryContainer">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Masonry;
