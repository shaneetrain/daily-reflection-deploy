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
            colors: {
                accent: {
                    DEFAULT: "#F59E0B",
                    hover: "#FBBF24",
                    dark: "#D97706",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
