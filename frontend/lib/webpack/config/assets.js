import CopyWebpackPlugin from 'copy-webpack-plugin';

const resolveFileLoader = (assetDirName, opts) => (
  opts.hash ?
    `file-loader?name=${assetDirName}/[name]-[hash].[ext]` :
    `file-loader?name=${assetDirName}/[name].[ext]`
);

const resolveAssetLoader = (assetDirName, opts) => (
  opts.extractAssets ?
    resolveFileLoader(assetDirName, opts) :
    'url-loader?limit=1000000000'
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
        loader: resolveAssetLoader('fonts', opts)
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: resolveAssetLoader('images', opts)
      }
    ]
  },
  plugins: [
    buildCopyPlugin()
  ]
});

export default buildAssetConfig;
