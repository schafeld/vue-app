import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'
import path from 'node:path'
import dotenv from 'dotenv'

// Load environment variables from outside the repository
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env vars from outside the repository
  const envDir = path.resolve(__dirname, '../../../')
  
  return {
  envDir,
  define: {
    // Explicitly define environment variables for the client
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
  },
  plugins: [
    VueRouter(),
    Components({}),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          'pinia': [
            'defineStore',
            'acceptHMRUpdate',
            'storeToRefs',
          ]
        }
      ],
      dts: true,
      viteOptimizeDeps: true,
      dirs: [
        'src/composables/**',
        'src/stores/**',
      ],
     }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: element => {
            return element.startsWith('iconify-icon')
          }
        },
      },
    }),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@': path.resolve(__dirname, './src'),
    },
  },
}
})
