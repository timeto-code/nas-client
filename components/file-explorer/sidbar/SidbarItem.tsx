import { File, Folder } from "@prisma/client";
import React from "react";

interface Props {
  item: File | Folder;
}

const SidbarItem = ({ item }: Props) => {
  return <div>SidbarItem</div>;
};

export default SidbarItem;
