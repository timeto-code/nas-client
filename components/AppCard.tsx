"use client";

import { useThemeStore } from "@/lib/stores/store";
import styles from "@/styles/AppCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AppCardProps {
  src: string;
  name?: string;
  isDeveloping?: boolean;
}

const AppCard = ({ name, src, isDeveloping }: AppCardProps) => {
  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);

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
    <div className="relative">
      <button
        className={theme === "light" ? styles.appCard : styles.appCard_dark}
        onClick={handleClick}
      >
        <Image src={src} width={80} height={80} alt="" />
        <span>{name}</span>
      </button>
      {isDeveloping && (
        <span className="w-full text-center absolute bottom-2 text-xs text-zinc-400">
          开发中...
        </span>
      )}
    </div>
  );
};

export default AppCard;