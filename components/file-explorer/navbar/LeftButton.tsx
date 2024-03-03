"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

const LeftButton = () => {
  const handleClick = () => {};

  return (
    <Image
      src="/icons/icons8-left-96.png"
      alt="Left"
      width={22}
      height={22}
      className={cn(
        "cursor-pointer hover:scale-110 transition duration-300 ease-in-out",
        true && "contrast-0 cursor-not-allowed opacity-50"
      )}
      quality={100}
      onClick={handleClick}
    />
  );
};

export default LeftButton;
