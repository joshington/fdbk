

import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'src/widget.ts'),
            name: 'FeedbackWidget',
            formats: ['iife'], //very important
            fileName: () => 'widget.js',
        },
        outDir: 'dist',
    },
});