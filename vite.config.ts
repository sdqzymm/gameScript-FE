import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// html插件, 替换网页title
function htmlPlugin(title: string) {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      return html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`)
    }
  }
}

export default ({ mode }) => {
  const path = require('path')
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_TITLE } = env
  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        imports: ['vue'],
        eslintrc: {
          enabled: true,
          globalsPropValue: 'readonly'
        },
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      htmlPlugin(VITE_APP_TITLE)
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://47.96.69.41:8888',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      // 预处理器, 引入scss全局变量和混入
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/variable.scss";
            @import "@/assets/scss/mixin.scss";
          `
        }
      },
      postcss: {
        plugins: [
          {
            // 避免@charset非顶部的警告
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
    }
  })
}
