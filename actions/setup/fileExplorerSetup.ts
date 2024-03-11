"use server";

import { __root_dir } from "@/utils/root-dir";
import axios from "axios";
import fs from "fs";
import path from "path";
import { settingsPath } from "../settings";

// 获取公钥路径
export const getKeyPath = () => {
  return path.join(__root_dir, "keys", "public-key.pem");
};

// 更新服务器地址
export const checkServerAddress = async (address: string) => {
  try {
    const response = await axios.get(`${address}/connection-test`);
    const { message, url } = await response.data;
    console.log(message, url);

    if (message === "successful" && url) {
      const config = fs.readFileSync(settingsPath, "utf-8");
      const configObj = JSON.parse(config);
      configObj["express-host"] = url;

      fs.writeFileSync(settingsPath, JSON.stringify(configObj, null, 2));

      return { status: 200 };
    }
    return { status: 500 };
  } catch (error) {
    throw error;
  }
};

// 更新jwt主题
export const setJwtSubject = async (subject: string) => {
  try {
    const config = fs.readFileSync(settingsPath, "utf-8");
    const configObj = JSON.parse(config);
    configObj["jwt-subject"] = subject;
    fs.writeFileSync(settingsPath, JSON.stringify(configObj, null, 2));
    return { status: 200 };
  } catch (error) {
    throw error;
  }
};

// 更新jwt签发者
export const setJwtIssuer = async (issuer: string) => {
  try {
    const config = fs.readFileSync(settingsPath, "utf-8");
    const configObj = JSON.parse(config);
    configObj["jwt-issuer"] = issuer;
    fs.writeFileSync(settingsPath, JSON.stringify(configObj, null, 2));
    return { status: 200 };
  } catch (error) {
    throw error;
  }
};

// 更新jwt接收者
export const setJwtAudience = async (audi: string) => {
  try {
    const config = fs.readFileSync(settingsPath, "utf-8");
    const configObj = JSON.parse(config);
    configObj["jwt-audience"] = audi;
    fs.writeFileSync(settingsPath, JSON.stringify(configObj, null, 2));
    return { status: 200 };
  } catch (error) {
    throw error;
  }
};
