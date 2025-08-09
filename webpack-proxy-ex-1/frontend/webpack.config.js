const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    hot: true,
    // Webpack Proxy Configuration - This is the key feature!
    proxy: {
      // Proxy all API calls to the backend server
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        onProxyReq: (proxyReq, req, res) => {
          console.log(`🔄 Proxying ${req.method} ${req.url} to backend server`);
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log(`✅ Received response ${proxyRes.statusCode} for ${req.url}`);
        },
        onError: (err, req, res) => {
          console.error('❌ Proxy error:', err);
        }
      },
      // Proxy health check endpoint
      '/health': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      },
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};