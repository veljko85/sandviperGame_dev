// vite.config.js
export default {
    base: "",
    root: "./src",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: "/index.html",
                admin: "/admin.html",
            },
        },
    },
};