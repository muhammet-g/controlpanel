const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "/app"),
    filename: "app.js",
  },
  module: {
    rules: [
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
        test: /\.(woff(2)?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
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
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
};

// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// // const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// module.exports = {
//   entry: {
//     app: "./src/index.js",
//   },
//   output: {
//     path: path.join(__dirname, "/app"),
//     filename: "app.js",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.html$/,
//         use: [
//           {
//             loader: "html-loader",
//           },
//         ],
//       },
//       {
//         test: /\.(sass|css|scss)$/,

//         use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           "css-loader",
//           "postcss-loader",
//           "sass-loader",
//         ],
//       },
//       {
//         test: /\.css$/,
//         use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
//       },
//       {
//         test: /\.(svg|eot|woff|woff2|ttf)$/,

//         exclude: /images/,

//         use: [
//           {
//             loader: "file-loader",

//             options: {
//               name: "[name].[ext]",

//               outputPath: "assets/fonts",
//             },
//           },
//         ],
//       },
//     ],
//   },
//   devServer: {
//     static: {
//       directory: path.join(__dirname, "app"),
//     },
//     compress: true,
//     port: 8081,
//     open: true,
//     devMiddleware: {
//       writeToDisk: true,
//     },
//   },
//   plugins: [
//     new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
//     // new OptimizeCSSAssetsPlugin({}),
//     new MiniCssExtractPlugin({
//       filename: "assets/css/style.css",
//     }),
//     new HtmlWebpackPlugin({
//       filename: "index.html",
//       template: "./src/index.html",
//     }),
//     new MiniCssExtractPlugin({
//       filename: "[name].css",
//       chunkFilename: "[id].css",
//     }),
//   ],
//   optimization: {
//     minimizer: [
//       `...`, // Include the default minimizers (i.e., Terser for JS)
//       new CssMinimizerPlugin(),
//     ],
//   },
// };
