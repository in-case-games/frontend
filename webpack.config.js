const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    assetModuleFilename: path.join("public", "[name][ext]"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        use: ["babel-loader"],
      },
      {
        test: /\.(scss|css|sass)$/,
        exclude: "/node_modules/",
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: !production,
            },
          },
          {
            loader: `postcss-loader`,
            options: {
              sourceMap: !production,
            },
          },
          {
            loader: `sass-loader`,
            options: {
              sourceMap: !production,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: "/node_modules/",
        type: "asset/resource",
        generator: {
          filename: path.join("public/assets/images", "[name][ext]"),
        },
      },
      {
        test: /\.svg$/,
        exclude: "/node_modules/",
        type: "asset/resource",
        generator: {
          filename: path.join("public/assets/icons", "[name][ext]"),
        },
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        exclude: "/node_modules/",
        type: "asset/resource",
        generator: {
          filename: path.join("public/assets/fonts", "[name][ext]"),
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".sass", ".css"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "InCase",
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 3000,
  },
  mode: production ? "production" : "development",
};
