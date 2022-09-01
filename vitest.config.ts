/// <reference types="vitest" />

import { defineConfig } from 'vite'
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
      ],
    },
  },
})
