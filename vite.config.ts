import legacy from "@vitejs/plugin-legacy";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const isDebug = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: isDebug ? [legacy(), reactRefresh()] : [], // 开发模式才去加载这个两个插件；
  // plugins: [legacy(), reactRefresh()], // 这两个包用于平时开发过程中，index.html、react刷新时到用的插件
  esbuild: {
    // 会默认导入react核心库
    jsxInject: `import React from 'react'`, // automatically import React in jsx files
  },
  resolve: {
    alias: {
      // for TypeScript path alias import like : @/x/y/z
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, "src/components/index.tsx"),
      name: "ToimcUI",
      // the proper extensions will be added
      fileName: "tomic-ui",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["react", "react-dom"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
