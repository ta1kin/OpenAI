import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
            @use "@/assets/styles/_vars.scss" as *;
            @use "@/assets/styles/_mixins.scss" as *;
          `
			}
		}
	},
  resolve: {
    alias: {
      '@': './src'
    }
  }
})
