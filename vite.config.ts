import { defineConfig, loadEnv, type UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { reactCompiler } from 'babel-plugin-react-compiler'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    base: process.env.PUBLIC_URL ?? '/',
    plugins: [react(), reactCompiler()],
    build: {
      outDir: 'build'
    },
    resolve: {
      alias: { '@': resolve(__dirname, 'src') }
    }
  })
}
