import axios from "axios";
import { useToastStore } from "./stores/useToastStore";

const downlaod = async (link: string, name: string) => {
  try {
    const jwtRes = await axios.get("/api/auth/jwt");
    if (jwtRes.status !== 200) return null;
    const { jwt } = jwtRes.data;
    console.log("jwt 生成成功");

    const host = process.env.NEXT_PUBLIC_EXPRESS_HOST;
    const res = await axios.get(`http://${host}/api/file/token/${link}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    const url = res.data.downloadLink as string;

    // 尝试获取文件头信息来检查文件是否可达
    const response = await fetch(url, { method: "HEAD" });

    if (response.ok) {
      // 如果文件可达，执行下载逻辑
      const element = document.createElement("a");
      element.setAttribute("href", url);
      element.setAttribute("download", name);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      useToastStore.setState({
        description: `${name} 文件未找到`,
        varient: "warning",
      });
      useToastStore.setState((state) => ({ refresh: !state.refresh }));
    }
  } catch (error) {
    useToastStore.setState({
      description: `${name} 下载失败`,
      varient: "destructive",
    });
    useToastStore.setState((state) => ({ refresh: !state.refresh }));
  }
};

export default downlaod;
