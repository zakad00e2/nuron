/* eslint-disable no-unused-vars */
const path = require("path");

module.exports = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "./src/assets/scss")],
        silenceDeprecations: ["legacy-js-api"],
    },
    images: {
        // allow next/image to load external images from ImageKit (author photos)
        domains: ["ik.imagekit.io", "brilliant-boot-036dae9a94.media.strapiapp.com"],
        // remotePatterns supported for fine-grained control
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ik.imagekit.io",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "brilliant-boot-036dae9a94.media.strapiapp.com",
                port: "",
                pathname: "/**",
            },
        ],
    },

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // eslint-disable-next-line no-param-reassign
        config.ignoreWarnings = [
            {
                message:
                    /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
            },
        ];
        return config;
    },
};
