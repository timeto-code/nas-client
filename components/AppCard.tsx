"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AppCardProps {
  src: string;
  name?: string;
  isDeveloping?: boolean;
}

const AppCard = ({ name, src, isDeveloping }: AppCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    switch (name) {
      case "资源管理器":
        router.push("/file-explorer");
        break;

      default:
        break;
    }
  };

  return (
    <button onClick={handleClick} className="appearance-none">
      <div
        className={cn(
          "relative w-40 h-40 flex flex-col items-center justify-center border dark:border-[#111] bg-neutral-50 dark:bg-[#111] transition-all duration-300 cursor-pointer hover:scale-110 rounded-md shadow-md hover:shadow-lg dark:shadow-[#000] dark:hover:shadow-[#000]"
        )}
      >
        <Image src={src} width={80} height={80} alt="" />
        <span>{name}</span>
        {isDeveloping && (
          <span className="w-full text-center absolute bottom-2 text-xs text-zinc-400">
            开发中...
          </span>
        )}
      </div>
    </button>
  );
};

export default AppCard;
