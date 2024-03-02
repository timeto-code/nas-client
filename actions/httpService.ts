import { env } from "@/utils/env.confi";
import logger from "@/utils/logger";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getKeys } from "./jwt/KeyManager";
import generateJWT from "./jwt/generateJWT";

// const date = new Date().toLocaleTimeString("zh-CN", { hour12: false });
const date = new Date().toLocaleString("zh-CN", { hour12: false });
const host = env.NEXT_PUBLIC_EXPRESS_HOST;
const http = axios.create({
  baseURL: `http://${host}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 异步操作：获取keys
        const { privateKey, publicKey } = await getKeys();

        // 检查keys是否有效
        if (!privateKey || !publicKey) {
          reject("Keys are missing");
          return;
        }

        // 异步操作：生成JWT
        const jwt = await generateJWT(privateKey);

        // 检查JWT是否有效
        if (!jwt) {
          reject("JWT generation failed");
          return;
        }

        // 如果JWT有效，添加到请求头
        config.headers["Authorization"] = `Bearer ${jwt}`;
        resolve(config); // 使用更新后的config解析Promise
      } catch (error) {
        // 处理异步操作中的错误
        reject(error);
      }
    });
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在2xx的范围
      switch (error.response.status) {
        case 400:
          // 处理400错误
          break;
        case 401:
          // 处理401错误，例如重定向到登录页
          break;
        case 403:
          // 处理403错误
          break;
        case 404:
          // 处理404错误
          break;
        // 更多错误处理...
        default:
          // 处理其他错误
          break;
      }
      const method = error.response.config.method?.toUpperCase();
      const message =
        (error.response.data as { message?: string }).message || "未知错误 ";
      logger.error(
        `[${date}] 请求错误 [${error.response.status}] ${message} [${method}] ${error.response.config.url}`
      );
    } else if (error.request) {
      // 请求已经发起，但没有收到响应
      logger.error(`[${date}] 服务器没有响应`);
    } else {
      // 发送请求时出了点问题
      logger.error(`[${date}] 请求发送失败`);
    }
    return Promise.reject(error);
  }
);

export default http;
