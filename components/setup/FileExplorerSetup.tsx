import { useToastStore } from "@/lib/stores/useToastStore";
import { Toast } from "@radix-ui/react-toast";
import axios from "axios";
import React, { useState, useTransition } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import Spinner from "../Spinner";
import GenerateNewKey from "../file-explorer/GenerateNewKey";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { IoAlertCircleOutline } from "react-icons/io5";

const FileExplorerSetup = () => {
  const [serverAddress, setServerAddress] = useState("");
  const [isPending, startTransition] = useTransition();
  const [testResult, setTestResult] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerAddress(e.target.value.trim());
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleSave();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      handleSave();
    }
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        if (!serverAddress) return;
        const res = await axios.post("/api/setup", {
          serverAddress,
          timestamp: Date.now(),
        });
        console.log(res);

        if (res.status === 200) {
          setTestResult(true);
          useToastStore.setState((state) => ({
            description: "连接成功",
            varient: "success",
            refresh: !state.refresh,
          }));
        } else {
          setTestResult(false);
          useToastStore.setState((state) => ({
            description: "连接失败",
            varient: "destructive",
            refresh: !state.refresh,
          }));
        }
      } catch (error) {
        setTestResult(false);
        useToastStore.setState((state) => ({
          description: "连接失败",
          varient: "destructive",
          refresh: !state.refresh,
        }));
      }
    });
  };

  return (
    <div className="h-full w-full flex-col flex gap-4">
      {/* 密钥路径展示 */}
      <div>
        <Label htmlFor="key-address" className="flex items-center">
          <span>密钥路径</span>
        </Label>
        <div id="key-address" className="flex items-end justify-between">
          <span className="w-full border-b truncate mr-3">
            /home/user/.ssh/id_rsacxczCxZxcZ
          </span>
          <GenerateNewKey />
        </div>
      </div>

      {/* 服务器地址配置 */}
      <div className="flex h-[52px] flex-col pt-[5px] relative">
        <Label htmlFor="server-address" className="flex items-center">
          <span>服务器地址</span>
          <div
            title="协议 + 域名/IP + 端口。默认80/443可以省略"
            className="ml-1 cursor-pointer"
          >
            <IoAlertCircleOutline />
          </div>
        </Label>
        <input
          id="server-address"
          className="border-b h-7 border-t-0 border-l-0 border-r-0 rounded-none p-0 focus:outline-none focus:ring-0 outline-none ring-0 bg-transparent text-base"
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={isPending}
          placeholder="https://example.com:8888"
        />
        <span className="absolute top-[25px] right-0">
          {isPending && (
            <Spinner className="h-4 w-4 animate-spin text-[#339900]" />
          )}
          {testResult ? (
            <IoCheckmark className="h-4 w-4 text-[#339900]" />
          ) : (
            <IoMdClose className="h-4 w-4 text-[#ff0000]" />
          )}
        </span>
      </div>

      {/* JWT 签名属性配置 */}
      <div className="flex h-[52px] flex-col pt-[5px]">
        <Label htmlFor="subject" className="flex items-center">
          <span>JWT 签名主题</span>
          <div title="任意字符串" className="ml-1 cursor-pointer">
            <IoAlertCircleOutline />
          </div>
        </Label>
        <input
          id="subject"
          className="border-b h-7 border-t-0 border-l-0 border-r-0 rounded-none p-0 focus:outline-none focus:ring-0 outline-none ring-0 bg-transparent text-base"
          onChange={handleChange}
          placeholder="my-file-explorer-jwt"
        />
      </div>
      <div className="flex h-[52px] flex-col pt-[5px]">
        <Label htmlFor="issuer" className="flex items-center">
          <span>JWT 签发者</span>
          <div
            title="签发者信息。任意字符串，一般为用户或系统名称。"
            className="ml-1 cursor-pointer"
          >
            <IoAlertCircleOutline />
          </div>
        </Label>
        <input
          id="issuer"
          className="border-b h-7 border-t-0 border-l-0 border-r-0 rounded-none p-0 focus:outline-none focus:ring-0 outline-none ring-0 bg-transparent text-base"
          onChange={handleChange}
          placeholder="from-user"
        />
      </div>
      <div className="flex h-[52px] flex-col pt-[5px]">
        <Label htmlFor="audience" className="flex items-center">
          <span>JWT 接收方</span>
          <div
            title="接收方信息。任意字符串，一般为唯一性的域名或网站。"
            className="ml-1 cursor-pointer"
          >
            <IoAlertCircleOutline />
          </div>
        </Label>
        <input
          id="audience"
          className="border-b h-7 border-t-0 border-l-0 border-r-0 rounded-none p-0 focus:outline-none focus:ring-0 outline-none ring-0 bg-transparent text-base"
          onChange={handleChange}
          placeholder="to-user"
        />
      </div>
    </div>
  );
};

export default FileExplorerSetup;
