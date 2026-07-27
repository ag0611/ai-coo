/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: '#0A0A0F',
                surface: '#13131A',
                accent: '#6C63FF',
                success: '#00D4AA',
                warning: '#FFB800',
                error: '#FF4D4D',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            }
        },
    },
    plugins: [],
}