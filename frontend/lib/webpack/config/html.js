import HtmlWebpackPlugin from 'html-webpack-plugin';
import { favicon as faviconMarkup } from '../../../src/assets/favicons/markup.json';

const buildHtmlPlugin = opts =>
  new HtmlWebpackPlugin({
    template: 'index.html',
    chunksSortMode: 'dependency',
    favicons: faviconMarkup,
    config: opts.appConfig,
    inject: false,
    minify: opts.optimize ? {
      caseSensitive: true,
      collapseWhitespace: true,
      removeComments: true
    } : false
  });

const buildHtmlConfig = opts => ({
  plugins: [
    buildHtmlPlugin(opts)
  ]
});

export default buildHtmlConfig;
