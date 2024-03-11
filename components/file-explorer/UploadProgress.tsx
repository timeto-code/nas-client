"use client";

import {
  useCancelUploadStore,
  useUploadStore,
} from "@/lib/stores/useUploadStore";
import { cn } from "@/lib/utils";
import bytes from "bytes";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

const UploadProgress = () => {
  const files = useUploadStore((state) => state.files);
  const clearFiles = useUploadStore((state) => state.clearFiles);
  const allUploadDone = useCancelUploadStore((state) => state.allUploadDone);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (files.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [files]);

  const handleClose = () => {
    clearFiles();
    setOpen(false);
  };

  const handleCancel = () => {
    useCancelUploadStore.setState({ cancel: true });
    // clearFiles();
    // setOpen(false);
  };

  if (files.length === 0) return null;

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        {files.map((file) => (
          <div
            key={file.id}
            className="flex flex-col gap-[2px] overflow-hidden"
          >
            <div className="flex justify-between relative overflow-hidden gap-7">
              <div className="text-nowrap truncate">{file.name}</div>
              <div className="flex gap-1 items-center text-sm">
                {file.status === "success" ? (
                  <span className="text-green-500">
                    {bytes(file.progressSize, { decimalPlaces: 1 })}
                  </span>
                ) : file.status === "error" ? (
                  <span className="text-red-500 w-14">上传失败</span>
                ) : file.status === "cancel" ? (
                  <span className="text-gray-500 w-11">已取消</span>
                ) : (
                  <span className="text-blue-500">
                    {bytes(file.progressSize, { decimalPlaces: 1 })}
                  </span>
                )}
                /<span>{bytes(file.size, { decimalPlaces: 1 })}</span>
              </div>
            </div>
            <Progress value={file.progress} className={cn("h-2 w-full")} />
          </div>
        ))}
        <AlertDialogFooter>
          {/* <AlertDialogCancel onClick={handleCancel} disabled={allUploadDone}>
            取消上传
          </AlertDialogCancel> */}
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={allUploadDone}
          >
            取消上传
          </Button>
          <AlertDialogAction disabled={!allUploadDone}>关闭</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UploadProgress;
