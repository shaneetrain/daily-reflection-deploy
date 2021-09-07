module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                128: "30rem",
                192: "45rem",
                256: "60rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
