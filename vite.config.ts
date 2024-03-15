/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  //path used for github pages https://jobceg.github.io/autocomplete/
  base: '/autocomplete',
  plugins: [react()],
  test: {
    coverage: {
      reporter: ['html', 'text', 'json-summary', 'json'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTest.ts'],
  },
});
