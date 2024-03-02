## 创建 NextJS 项目

1. 使用 `npx` 创建一个新的 NextJS 项目
   ```bash
   npx create-next-app@latest
   ```
1. 安装 `shadcn/ui`

   ```bash
   npx shadcn-ui@latest init
   ```

1. 创建主题组件

   ```bash
   npm install next-themes
   ```

1. 更新 `package.json` 文件

   ```json
   "scripts": {
      "dev": "cross-env NODE_ENV=development next dev -p 80",
      "build": "next build",
      "start": "cross-env NODE_ENV=production next start -p 80",
      "lint": "next lint"
   }
   ```

1. 配置 `.env*` 文件

   ```bash
   .env
   .env.development
   .env.production
   .env.local
   ```

1. 创建 `middleware` 文件
