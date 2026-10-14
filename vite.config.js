import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { reactClickToComponent } from 'vite-plugin-react-click-to-component'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    reactClickToComponent(),
    tailwindcss()
  ],
})