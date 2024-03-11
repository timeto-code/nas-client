"use client";

import uploadFiles from "@/lib/chunks";
import { useFolderStore } from "@/lib/stores/useFolderStore";
import { useToastStore } from "@/lib/stores/useToastStore";
import { useCancelUploadStore } from "@/lib/stores/useUploadStore";
import Image from "next/image";
import React, { useRef, useTransition } from "react";

const UploadFileButton = () => {
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const folderId = useFolderStore((state) => state.folderId);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    inputRef.current!.click();
  };

  const selectFile = (value: FileList) => {
    startTransition(async () => {
      const files = Array.from(value);
      if (files.length > 5) {
        useToastStore.setState({
          title: Math.random().toString(36).substring(7),
        });
        useToastStore.setState({ description: "单次上传文件数量不得超过5个" });
        return;
      }

      useCancelUploadStore.setState({ cancel: false });
      useCancelUploadStore.setState({ allUploadDone: false });
      await uploadFiles(files, folderId);
      useFolderStore.setState((state) => ({ refresh: !state.refresh }));
    });
  };

  return (
    <>
      <button
        className="appearance-none"
        onClick={handleClick}
        disabled={isPending}
      >
        <Image
          className="hover:scale-110 transition duration-300 ease-in-out"
          src="/icons/icons8-upload-to-cloud-96.png"
          width={28}
          height={28}
          alt=""
          title="打开根文件夹"
        />
      </button>

      <input
        className="hidden"
        ref={inputRef}
        type="file"
        multiple
        onChange={(event) => selectFile(event.target.files!)}
      />
    </>
  );
};

export default UploadFileButton;
