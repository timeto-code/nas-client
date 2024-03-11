"use client";

import { useRouter } from "next/navigation";
import ThemeSwitch from "../ThemeSwitch";
import { Button } from "../ui/button";
import TabButton from "./TabButton";
import { useSetupStore } from "./store";
import FileExplorerSetup from "./FileExplorerSetup";
import Toast from "../Toast";

const Setup = () => {
  const router = useRouter();
  const tab = useSetupStore((state) => state.tab);

  return (
    <div className="h-full p-5 relative max-w-[1024px] m-auto">
      <div className=" absolute top-5 inset-x-5">
        <div className="flex justify-between pb-2 ">
          <h2>设置</h2>
          <div className="flex items-start ">
            <div className="flex items-center gap-5">
              <ThemeSwitch />
              <Button
                className="h-7"
                onClick={() => {
                  router.push("/");
                }}
              >
                主页
              </Button>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className=" h-full w-full pt-16">
        <div className="h-full flex ">
          <div className="flex flex-col min-w-36 items-start gap-3">
            <TabButton label="资源管理器" />
            <TabButton label="AI 知识库" />
            <TabButton label="AIGC 展览馆" />
            <TabButton label="影音中心" />
          </div>
          <div className="border-l h-full mx-4" />
          <div className="h-full w-full overflow-auto">
            <div className="pb-4">
              {tab === "资源管理器" && <FileExplorerSetup />}
              {tab === "AI 知识库" && <div>AI 知识库</div>}
              {tab === "AIGC 展览馆" && <div>AIGC 展览馆</div>}
              {tab === "影音中心" && <div>影音中心</div>}
            </div>
          </div>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default Setup;
