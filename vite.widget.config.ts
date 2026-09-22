
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/widget.ts'),
      name: 'FeedbackWidget',
      formats: ['iife'],
      fileName: () => 'widget.js',
    },
  },
});