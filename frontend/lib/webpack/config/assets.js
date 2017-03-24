import CopyWebpackPlugin from 'copy-webpack-plugin';

const resolveFileLoader = (assetDirName, opts) => (
  opts.hash ?
    `file-loader?name=${assetDirName}/[name]-[hash].[ext]` :
    `file-loader?name=${assetDirName}/[name].[ext]`
);

const buildCopyPlugin = () =>
  new CopyWebpackPlugin([
    { from: 'assets' }
  ]);

const buildAssetConfig = opts => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: resolveFileLoader('fonts', opts)
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: resolveFileLoader('images', opts)
      }
    ]
  },
  plugins: [
    buildCopyPlugin()
  ]
});

export default buildAssetConfig;
