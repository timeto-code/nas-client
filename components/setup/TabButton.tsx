import { cn } from "@/lib/utils";
import { useSetupStore } from "./store";

interface Props {
  label: string;
}

const TabButton = ({ label }: Props) => {
  const tab = useSetupStore((state) => state.tab);

  const handleClick = async () => {
    useSetupStore.setState({ tab: label });
  };

  return (
    <button
      className={cn(
        "w-full appearance-none px-2 py-1 rounded hover:bg-slate-300/50 dark:hover:bg-slate-600/50 text-start",
        tab === label && "bg-slate-300/50 dark:bg-slate-600/50"
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
