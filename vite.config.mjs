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
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) { // The id parameter represents the path to each module/file.
                    // Group React libraries
                    if (id.includes('react')) {
                        return 'vendor-react';
                    }

                    // Group other libraries
                    if (id.includes('@supabase/supabase-js') ||
                        id.includes('@vis.gl/react-google-maps')) {
                        return 'vendor-other';
                    }

                    // Group FontAwesome libraries
                    if (id.includes('@fortawesome')) {
                        return 'vendor-fontawesome';
                    }

                    // Group Babel libraries
                    if (id.includes('@babel')) {
                        return 'vendor-babel';
                    }

                    // Create a chunk for src/components folder
                    if (id.includes('/src/components/')) {
                        const match = id.match(/\/src\/components\/([^/]+)/); // Match subfolder or file
                        if (match) {
                            return `components-${match[1]}`; // Create chunks
                        }
                        return 'components';
                    }
                    return 'default';
                },
            },
        }
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
    }
});
