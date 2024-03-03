"use client";

import React from "react";
import Image from "next/image";
import { useNavbarStore } from "@/lib/stores/useNavbarStore";

const TableSwitchButton = () => {
  const isTablet = useNavbarStore((state) => state.isTablet);

  return (
    <Image
      className="cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
      src={
        isTablet
          ? "/icons/icons8-menu-96.png"
          : "/icons/icons8-squared-menu-96.png"
      }
      width={28}
      height={28}
      alt=""
      onClick={() => {
        useNavbarStore.setState({ isTablet: !isTablet });
      }}
      title="打开根文件夹"
    />
  );
};

export default TableSwitchButton;
