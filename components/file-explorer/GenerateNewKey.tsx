"use client";

import { generateAsymmetrickey } from "@/actions/generateAsymmetrickey";
import { useToastStore } from "@/lib/stores/useToastStore";
import { Button } from "../ui/button";

const GenerateNewKey = () => {
  return (
    <Button
      className="h-7"
      onClick={async () => {
        const res = await generateAsymmetrickey();

        if (res.status === 200) {
          useToastStore.setState((state) => ({
            title: "新密钥已生成",
            description: "请前往密钥文件夹查看，并同步更新公钥到服务器。",
            varient: "success",
            refresh: !state.refresh,
          }));
        } else {
          useToastStore.setState((state) => ({
            title: "密钥生成失败",
            description: "请重新尝试，或联系管理员。",
            varient: "destructive",
            refresh: !state.refresh,
          }));
        }
      }}
    >
      生成新密钥
    </Button>
  );
};

export default GenerateNewKey;
