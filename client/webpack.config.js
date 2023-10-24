const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

//Add and configure workbox plugins for a service worker and manifest file.
module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name}.bundle.js",
      path: path.resolve(_dirname, "dist"),
    },
    plugins: [
      //Webpack to generates HTML files and inject nundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Just another Text Editor",
      }),
      // Custom Service Worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      //Manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description: "Create notes with or without internet connection!",
        background_color: "#272822",
        theme_color: "#272822",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    // Add CSS loaders and babel to webpack.
    module: {
      rules: [
        // CSS loader to webpack
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // Babel to webpack
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  }
};
