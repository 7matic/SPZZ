import {join} from 'path';
import type {Config} from 'tailwindcss';

// 1. Import the Skeleton plugin
import {skeleton} from '@skeletonlabs/tw-plugin';

const config = {
    // 2. Opt for dark mode to be handled via the class method
    darkMode: 'class',
    content: [
        './src/**/*.{html,js,svelte,ts}',
        // 3. Append the path to the Skeleton package
        join(require.resolve(
                '@skeletonlabs/skeleton'),
            '../**/*.{html,js,svelte,ts}'
        )
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3887be',
                background: '#122f43',
                dark: '#0b1c28',
                light: '#4FB7FF',
            },
            boxShadow: {
                'outline-primary': '0px 14px 55px rgba(56, 135, 190, 0.45)',
                'outline-primary-sm': '0px 14px 55px rgba(56, 135, 190, 0.25)',
            }
        },
    },
    plugins: [
        skeleton({
            themes: {preset: ["skeleton"]}
        })
    ]
} satisfies Config;

export default config;