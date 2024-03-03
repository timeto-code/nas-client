import { cn } from "@/lib/utils";
import SidbarExplorerTree from "./SidbarExplorerTree";
import SidbarRecently from "./SidbarRecently";
import UserResources from "../UserResources";

const SidbarForUser = () => {
  return (
    <div
      className={cn(
        "h-full flex flex-col justify-between border-r border-zinc-300 dark:border-[#111] pt-2 pb-[28px] pl-2 pr-[2px]",
        "dark:bg-[#111] dark:shadow-sidbar-dark shadow-sidbar-light"
        // `${styles.sidbar}`
      )}
    >
      <div className="flex h-full flex-col gap-1 pr-[6px] py-2 relative overflow-auto">
        <SidbarRecently />
        <SidbarExplorerTree />
      </div>
      <UserResources />
    </div>
  );
};

export default SidbarForUser;
