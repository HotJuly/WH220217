import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
      extensions: [".ts", ".vue", ".js", ".jsx", ".tsx"], // 导入时想要省略的扩展名列表。
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
          // 给导入的路径最后加上 ;
          additionalData: '@import "./src/styles/variables.scss";',
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },

    proxy: {
      "/app-dev": {
        // 代理所有以 '/app-dev'开头的请求路径
        // 后台接口地址
        // 备用网址:'http://sph-h5-api.atguigu.cn/'
        target: "http://gmall-h5-api.atguigu.cn/",
        // 服务器得到的就不是当前应用的域名了, 而是后台的域名
        changeOrigin: true,
        // 重写路径: 去掉路径中开头的'/dev-api'
        rewrite: (path: any) => path.replace(/^\/app-dev/, ""),
      },
    },
  };
});
