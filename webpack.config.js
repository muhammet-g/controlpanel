const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
    "assets/js/banner": "./src/assets/js/banner.js",
    // "assets/js/chart": "./src/assets/js/chart.js",
    // "assets/js/tabs": "./src/assets/js/tabs.js",
    // "assets/js/upload": "./src/assets/js/upload.js",
  },
  output: {
    path: path.join(__dirname, "/app"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        exclude: /images/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[ext]",
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "app"),
    },
    compress: true,
    port: 8081,
    open: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: "assets/css/style.css",
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/button.html",
      template: "./src/components/button.html",
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/textfield.html",
      template: "./src/components/textfield.html",
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/card.html",
      template: "./src/components/card.html",
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      filename: "components/banner.html",
      template: "./src/components/banner.html",
      chunks: ["app", "assets/js/banner"],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
};
