import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

const buildExtractStylePlugin = opts =>
  new ExtractTextPlugin({
    filename: opts.hash ? '[name]-[contenthash].css' : '[name].css',
    allChunks: true,
    disable: !opts.extractAssets
  });

const buildStyleConfig = opts => ({
  module: {
    rules: [
      {
        test: /(\.scss|\.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: true,
              // https://github.com/webpack/css-loader#css-modules
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: opts.sourceMaps
            }
          }, {
            loader: 'resolve-url-loader',
            options: { sourceMap: opts.sourceMaps }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: opts.sourceMaps,
              plugins: () => [autoprefixer, precss]
            }
          }, {
            loader: 'sass-loader'
          }]
        })
      }
    ]
  },
  plugins: [
    buildExtractStylePlugin(opts)
  ]
});

export default buildStyleConfig;
