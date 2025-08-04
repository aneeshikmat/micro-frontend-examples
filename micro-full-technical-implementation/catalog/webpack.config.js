const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  devServer: {
    port: 8103,
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "catalog",
      filename: "remoteEntry.js",
      exposes: {
        "./Catalog": "./src/Catalog",
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: "^18.2.0" 
        },
        "react-dom": { 
          singleton: true, 
          requiredVersion: "^18.2.0" 
        },
        "@mui/material": { 
          singleton: true, 
          requiredVersion: "^5.14.10" 
        },
        "@mui/icons-material": { 
          singleton: true, 
          requiredVersion: "^5.14.10" 
        },
        "@emotion/react": { 
          singleton: true, 
          requiredVersion: "^11.11.1" 
        },
        "@emotion/styled": { 
          singleton: true, 
          requiredVersion: "^11.11.1" 
        },
        "react-router-dom": { 
          singleton: true, 
          requiredVersion: "^6.16.0" 
        },
        "event-bus": {
          singleton: true,
          requiredVersion: "^1.0.0"
        }
      },
    }),
  ],
};