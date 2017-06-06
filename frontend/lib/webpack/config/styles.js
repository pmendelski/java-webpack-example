import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

const buildExtractStylePlugin = opts =>
  new ExtractTextPlugin({
    filename: opts.hash ? '[name]-[contenthash].css' : '[name].css',
    allChunks: true,
    disable: !opts.extractAssets
  });

const cssModuleLoader = opts => ({
  loader: 'css-loader',
  options: {
    minimize: opts.optimize,
    modules: true,
    importLoaders: true,
    // https://github.com/webpack/css-loader#css-modules
    localIdentName: '[name]__[local]___[hash:base64:5]',
    sourceMap: opts.sourceMaps
  }
});

const globalCssLoader = opts => ({
  loader: 'css-loader',
  options: {
    minimize: opts.optimize,
    importLoaders: true,
    // https://github.com/webpack/css-loader#css-modules
    localIdentName: '[name]__[local]___[hash:base64:5]',
    sourceMap: opts.sourceMaps
  }
});

const resolveUrlLoader = opts => ({
  loader: 'resolve-url-loader',
  options: { sourceMap: opts.sourceMaps }
});

const postCssLoader = opts => ({
  loader: 'postcss-loader',
  options: {
    sourceMap: opts.sourceMaps,
    plugins: () => [autoprefixer, precss]
  }
});

const sassLoader = () => ({
  loader: 'sass-loader'
});

const prepareStyleLoader = (cssLoader, opts) =>
  ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      cssLoader(opts),
      resolveUrlLoader(opts),
      postCssLoader(opts),
      sassLoader(opts)
    ]
  });

const buildStyleConfig = opts => ({
  module: {
    rules: [
      {
        test: /(\.scss|\.css)$/,
        exclude: /(global\.scss|global\.css)$/,
        use: prepareStyleLoader(cssModuleLoader, opts)
      },
      {
        test: /(global\.scss|global\.css)$/,
        use: prepareStyleLoader(globalCssLoader, opts)
      }
    ]
  },
  plugins: [
    buildExtractStylePlugin(opts)
  ]
});

export default buildStyleConfig;
