import { getFolderById } from "@/actions/api/folder";
import axios from "axios";
import { useToastStore } from "./stores/useToastStore";
import {
  ProgressFile,
  useCancelUploadStore,
  useUploadStore,
} from "./stores/useUploadStore";

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
  const { serverUrl } = serverInfo.data;

  // 遍历文件，上传
  const uploadPromises = Array.from(files).map((file) =>
    uploadFileInChunks(file, chunkSize, folderId, serverUrl)
  );

  // 等待所有文件上传完成
  try {
    await Promise.all(uploadPromises);
    useCancelUploadStore.setState({ allUploadDone: true });
    // console.log("All files uploaded successfully");
  } catch (error) {
    // 有报错也要开发关闭按钮
    useCancelUploadStore.setState({ allUploadDone: true });
    // console.error("Error uploading files:", error);
  }
};

const uploadFileInChunks = async (
  file: File,
  chunkSize: number,
  folderId: string,
  serverUrl: string
) => {
  const totalChunks = Math.ceil(file.size / chunkSize);
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
    // 检查是否取消上传
    const cancel = useCancelUploadStore.getState().cancel;
    if (cancel) {
      setStatus(`${timestamp}${folderId}-${file.name}`, "cancel");
      return;
    }

    // 分块
    const chunk = file.slice(
      chunkIndex * chunkSize,
      (chunkIndex + 1) * chunkSize
    );

    // 更新进度
    setProgress(
      `${timestamp}${folderId}-${file.name}`,
      chunkIndex + 1,
      chunk.size
    );

    // 标记最后一个分块
    const isLastChunk = chunkIndex === totalChunks - 1;

    // 上传分块
    const uploadStatus = await uploadChunk(
      chunk,
      chunkIndex,
      `${timestamp}${folderId}-${file.name}`,
      isLastChunk,
      folderId,
      serverUrl
    );

    // 上传失败
    if (!uploadStatus) {
      setStatus(`${timestamp}${folderId}-${file.name}`, "error");
      return;
    }
  }

  setStatus(`${timestamp}${folderId}-${file.name}`, "success");
};

// 分块上传
const uploadChunk = async (
  chunk: Blob,
  chunkIndex: number,
  fileName: string,
  isLastChunk: boolean,
  folderId: string,
  serverUrl: string
) => {
  const formData = new FormData();
  formData.append("file", chunk);
  formData.append("chunkIndex", `${chunkIndex}`);
  formData.append("isLastChunk", `${isLastChunk}`);
  formData.append("fileName", fileName);
  formData.append("folderId", folderId);

  try {
    const response = await fetch(`${serverUrl}/api/file/upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      return false;
    }
    console.log(`Chunk ${chunkIndex} of ${fileName} uploaded successfully`);
    return true;
  } catch (error) {
    console.error("Error uploading chunk:", error);
    return false;
  }
};

export default uploadFiles;
