

import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    build: {
        // 1. Specify where the final combined production output should go
        outDir: "dist",
        emptyOutDir: false, //prevents deleting files if building simultaneously
        rollupOptions: {
            //2 - multi-page application inputs
            input: {
                main: resolve(__dirname, "index.html"),
                auth: resolve(__dirname, "auth.html"),
                dashboard: resolve(__dirname, "dashboard.html"),
                //compiles the widget file alongside the pages
                widget: resolve(__dirname, "src/widget.ts")
            },
            //3 - keep output file names predictable and clean
            output: {
                entryFileNames: (chunkInfo) => {
                // If compiling the widget code, name it strictly 'widget.js' at root of dist/
                    return chunkInfo.name === "widget" ? "widget.js" : "assets/[name]-[hash].js";
                },
                chunkFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash].[ext]"
            }
        }
        //lib: {
        //    entry: resolve(import.meta.dirname, 'src/widget.ts'),
        //    name: 'FeedbackWidget',
        //    formats: ['iife'], //very important
        //    fileName: () => 'widget.js',
        //},
        //the lib config block is used when building only single standalone JS library file
    },
    server: {
        port: 3000,
        open: true // auto opens browser when running local tests
    }
});