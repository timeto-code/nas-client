"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/")} className="h-7">
      主页
    </Button>
  );
};

export default HomeButton;
