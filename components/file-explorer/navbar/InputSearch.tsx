"use client";

import { Input } from "@/components/ui/input";
import React from "react";

const InputSearch = () => {
  return (
    <Input
      className="h-7 w-80 shadow-md dark:shadow-lg "
      placeholder="按 / 开始搜索"
      onFocus={() => {}}
    />
  );
};

export default InputSearch;
