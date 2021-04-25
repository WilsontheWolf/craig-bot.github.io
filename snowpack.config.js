/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        public: { url: '/', static: true },
        src: { url: '/dist' },
    },
    plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-dotenv', '@snowpack/plugin-webpack'],
    routes: [
        /* Enable an SPA Fallback in development: */
        // {"match": "routes", "src": ".*", "dest": "/index.html"},
    ],
    optimize: {
        /* Example: Bundle your final build: */
        // "bundle": true,
    },
    packageOptions: {
        /* ... */
    },
    devOptions: {
        open: 'none'
    },
    buildOptions: {
        baseUrl: ''
    },
};

// This allows me to get the baseURL in the app
process.env.SNOWPACK_PUBLIC_URL = process.env.npm_lifecycle_event === 'build' ?
    module.exports.buildOptions.baseUrl || '' :
    '';
