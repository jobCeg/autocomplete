/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  //path used for github pages https://jobceg.github.io/autocomplete/
  base: '/autocomplete',
  plugins: [react()],
  test: {
    coverage: {
      exclude: [...(configDefaults.coverage.exclude ?? []), 'src/main.tsx'],
      reporter: ['html', 'text', 'json-summary', 'json'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'src/main.tsx'],
    globals: true,
    setupFiles: ['./setupTest.ts'],
  },
});
