import { getKeyPath } from "@/actions/setup/fileExplorerSetup";
import { useEffect, useState } from "react";
import GenerateNewKey from "../file-explorer/GenerateNewKey";
import { Label } from "../ui/label";
import SetupInput from "./SetupInput";

const FileExplorerSetup = () => {
  const [keyPath, setKeyPath] = useState("");

  useEffect(() => {
    const keyPath = getKeyPath();
    setKeyPath(keyPath);
  }, []);

  return (
    <div className="h-full w-full flex-col flex gap-4 relative">
      {/* 密钥路径展示 */}
      <div>
        <Label htmlFor="key-address" className="flex items-center">
          <span>密钥路径</span>
        </Label>
        <div id="key-address" className="flex items-end justify-between">
          <span className="w-full border-b truncate mr-3">
            {keyPath || "未设置"}
          </span>
          <GenerateNewKey />
        </div>
      </div>

      {/* 服务器地址配置 */}
      <SetupInput
        label="服务器地址"
        title="协议 + 域名/IP + 端口。默认80/443可以省略"
        placeholder="https://example.com:8888"
        actionName="checkServerAddress"
      />

      {/* JWT 签名属性配置 */}
      <SetupInput
        label="JWT 签名主题"
        title="任意字符串"
        placeholder="my-file-explorer-jwt"
        actionName="setJwtSubject"
      />
      <SetupInput
        label="JWT 签发者"
        title="任意字符串"
        placeholder="from-user"
        actionName="setJwtIssuer"
      />
      <SetupInput
        label="JWT 接收方"
        title="任意字符串"
        placeholder="to-user"
        actionName="setJwtAudience"
      />
    </div>
  );
};

export default FileExplorerSetup;
