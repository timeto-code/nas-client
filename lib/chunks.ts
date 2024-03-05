import { getFolderById } from "@/actions/api/folder";
import axios from "axios";
import { useToastStore } from "./stores/useToastStore";

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
  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const chunk = file.slice(
      chunkIndex * chunkSize,
      (chunkIndex + 1) * chunkSize
    );
    const isLastChunk = chunkIndex === totalChunks - 1;
    // chunkUploadPromises.push(
    await uploadChunk(
      chunk,
      chunkIndex,
      `${timestamp}${folderId}-${file.name}`,
      isLastChunk,
      folderId,
      server
    );
    // );
  }

  // await Promise.all(chunkUploadPromises);
  console.log(`File ${file.name} uploaded successfully`);
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
      throw new Error(`Upload failed for chunk ${chunkIndex} of ${fileName}`);
    }
    console.log(`Chunk ${chunkIndex} of ${fileName} uploaded successfully`);
  } catch (error) {
    console.error("Error uploading chunk:", error);
    throw error; // 抛出错误，让Promise.all可以捕获
  }
};

export default uploadFiles;
