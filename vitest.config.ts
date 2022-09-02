/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      exclude: [
        '**/*.test.ts',
        'node_modules/**',
        'src/components/IconBase/IconOptions/**',
        'src/utils/index.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    conditions: process.env.VITEST ? ['node'] : [],
  },
})
