import { getFolderById } from "@/actions/api/folder";
import axios from "axios";
import { useToastStore } from "./stores/useToastStore";
import { ProgressFile, useUploadStore } from "./stores/useUploadStore";

const uploadFiles = async (files: File[], folderId: string) => {
  const chunkSize = 1024 * 1024; // 分块大小，这里我们使用1MB，你可以根据需要调整

  const res = await getFolderById(folderId); // 确保文件夹存在
  if (res.error) {
    useToastStore.setState((state) => ({
      description: "上传失败！",
      refresh: !state.refresh,
    }));
    return;
  }

  const serverInfo = await axios.get("/api/setup");
  const { server } = serverInfo.data;

  const uploadPromises = Array.from(files).map((file) =>
    uploadFileInChunks(file, chunkSize, folderId, server)
  );

  try {
    await Promise.all(uploadPromises);
    console.log("All files uploaded successfully");
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};

const uploadFileInChunks = async (
  file: File,
  chunkSize: number,
  folderId: string,
  server: string
) => {
  const totalChunks = Math.ceil(file.size / chunkSize);
  const chunkUploadPromises = [];
  const timestamp = new Date().getTime();

  const setFiles = useUploadStore.getState().setFiles;
  const progrssFile: ProgressFile = {
    id: `${timestamp}${folderId}-${file.name}`,
    name: file.name,
    size: file.size,
    totalChunks,
    progress: 0,
    status: "pending",
    progressSize: 0,
  };
  setFiles(progrssFile);

  const setProgress = useUploadStore.getState().setProgress;
  const setStatus = useUploadStore.getState().setStatus;
  let uploadStatus = true;
  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const chunk = file.slice(
      chunkIndex * chunkSize,
      (chunkIndex + 1) * chunkSize
    );
    setProgress(
      `${timestamp}${folderId}-${file.name}`,
      chunkIndex + 1,
      chunk.size
    );
    const isLastChunk = chunkIndex === totalChunks - 1;
    // chunkUploadPromises.push(
    const uploadStatus = await uploadChunk(
      chunk,
      chunkIndex,
      `${timestamp}${folderId}-${file.name}`,
      isLastChunk,
      folderId,
      server
    );

    if (!uploadStatus) {
      setStatus(`${timestamp}${folderId}-${file.name}`, "error");
      return;
    }
    // );
  }

  setStatus(`${timestamp}${folderId}-${file.name}`, "success");
  // await Promise.all(chunkUploadPromises);
};

const uploadChunk = async (
  chunk: Blob,
  chunkIndex: number,
  fileName: string,
  isLastChunk: boolean,
  folderId: string,
  server: string
) => {
  const formData = new FormData();
  formData.append("file", chunk);
  formData.append("chunkIndex", `${chunkIndex}`);
  formData.append("isLastChunk", `${isLastChunk}`);
  formData.append("fileName", fileName);
  formData.append("folderId", folderId);

  try {
    const response = await fetch(`${server}/api/file/upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      return false;
      // 抛出异常让Promise.all可以捕获
      // throw new Error(`Upload failed for chunk ${chunkIndex} of ${fileName}`);
    }
    console.log(`Chunk ${chunkIndex} of ${fileName} uploaded successfully`);
    return true;
  } catch (error) {
    console.error("Error uploading chunk:", error);
    // throw error; 抛出异常让Promise.all可以捕获
    return false;
  }
};

export default uploadFiles;
