import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import eslint from "vite-plugin-eslint";

export default defineConfig ({

    plugins: [react(), jsconfigPaths(), eslint()],
    server: {
        port: 3000,
        open: '/'
    },
    preview: {
        port: 3000
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'src/tests/setupTests.js',
        include: ['src/tests/**/*.{test,spec}.{js,jsx,ts,tsx}'] // Only run tests in this folder
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            }
        }
    }
});
