"use client";

import GenerateNewKey from "@/components/GenerateNewKey";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToastStore } from "@/lib/stores/useToastStore";
import axios from "axios";
import React, { useState, useTransition } from "react";
import { IoCheckmark } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const Setup = () => {
  const [serverAddress, setServerAddress] = useState("");
  const [isPending, startTransition] = useTransition();
  const [testResult, setTestResult] = useState(false);

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
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <GenerateNewKey />
        <div className="flex flex-col gap-1 relative">
          <Label htmlFor="server-address" className="font-sans">
            配置服务器地址
          </Label>
          <Input
            id="server-address"
            className=""
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={isPending}
            placeholder="https://example.com"
          />
          {isPending && (
            <Spinner className="absolute top-[30px] right-2 h-4 w-4 animate-spin text-[#339900]" />
          )}
          {testResult ? (
            <IoCheckmark className="absolute top-[30px] right-2 h-4 w-4 text-[#339900]" />
          ) : (
            <IoMdClose className="absolute top-[30px] right-2 h-4 w-4 text-[#ff0000]" />
          )}
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default Setup;
