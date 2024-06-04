/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
    appId: "com.electron.qlikui",
    productName: "Qlik Brand UI",
    directories: {
        output: "release",
        buildResources: "build",
    },
    files: ["dist-main/index.js", "dist-preload/index.js", "dist-renderer/**/*"],
    extraMetadata: {
        version: process.env.VITE_APP_VERSION,
    },
    mac: {
        icon: "build/app-icon-dark.png",
        hardenedRuntime: true,
        gatekeeperAssess: false,
        target: [
            {
                target: "dmg",
                arch: "universal",
            },
            {
                target: "pkg",
                arch: "universal",
            },
        ],
    },
    win: {
        icon: "build/app-icon-dark.png",
        target: [
            {
                target: "msi",
            },
            {
                target: "nsis",
            },
            {
                target: "zip",
            },
            {
                target: "appx",
            },
            {
                target: "portable",
            },
        ],
    },
    linux: {
        category: "Utility",
        target: [
            {
                target: "AppImage",
            },
            {
                target: "deb",
            },
            {
                target: "zip",
            },
        ],
    },
    appx: {
        applicationId: "cparsy.QlikBrandUI",
        backgroundColor: "#1F1F1F",
        displayName: "Qlik Brand UI",
        identityName: "cparsy.QlikBrandUI",
        publisher: "CN=AD6BF16D-50E3-4FD4-B769-78A606AFF75E",
        publisherDisplayName: "Clément Parsy",
        languages: ["en-US"],
    },
};

module.exports = config;
