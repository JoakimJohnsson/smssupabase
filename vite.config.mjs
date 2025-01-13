import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
import eslint from "vite-plugin-eslint";


export default defineConfig({
    plugins: [react(), jsconfigPaths(), eslint()],
    server: {
        port: 3000,
        open: "/"
    },
    preview: {
        port: 3000
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "src/tests/setupTests.js",
        include: ["src/tests/**/*.{test,spec}.{js,jsx,ts,tsx}"] // Only run tests in this folder
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            }
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) {
                            return 'react';
                        }
                        if (id.includes('@fortawesome')) {
                            return 'fontawesome';
                        }
                        if (id.includes('@supabase')) {
                            return 'supabase';
                        }
                        if (id.includes('lodash')) {
                            return 'lodash';
                        }
                        if (id.includes('recharts')) {
                            return 'recharts';
                        }
                        if (id.includes('validator')) {
                            return 'validator';
                        }
                        if (id.includes('d3')) {
                            return 'd3';
                        }
                        if (id.includes('core-js')) {
                            return 'core-js';
                        }
                        if (id.includes('@octokit')) {
                            return 'octokit';
                        }
                        if (id.includes('@popperjs')) {
                            return 'popperjs';
                        }
                        if (id.includes('jspdf')) {
                            return 'jspdf';
                        }
                        if (id.includes('papaparse')) {
                            return 'papaparse';
                        }
                    }
                }
            }
        }
    }
});
