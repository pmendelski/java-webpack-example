import path from 'path';
import { mergeWith } from 'lodash';
import buildAssetsConfig from './assets';
import buildScriptsConfig from './scripts';
import buildStylesConfig from './styles';
import buildHtmlConfig from './html';

const configBuilders = [
  buildAssetsConfig,
  buildScriptsConfig,
  buildStylesConfig,
  buildHtmlConfig
];

const filterEmpty = arr => arr.filter(i => !!i);
const srcPath = path.resolve(process.cwd(), 'src');

const mergeConfigs = (a, b) =>
  mergeWith({}, a, b, (av, bv) => (
    Array.isArray(av) ?
      av.concat(bv) :
      undefined
  ));

const normalizeConfig = config => ({
  ...config,
  plugins: filterEmpty(config.plugins || []),
  module: {
    ...config.module,
    loaders: filterEmpty(config.module.loaders || [])
  }
});

const buildEntryPoint = (fileName, opts) =>
  filterEmpty([
    opts.watch && 'react-hot-loader/patch',
    fileName
  ]);

const buildConfigBase = opts => ({
  context: srcPath,
  devtool: opts.sourceMaps && 'cheap-module-source-map',
  devServer: opts.devServer,
  entry: {
    main: buildEntryPoint('./main.js', opts),
    vendor: buildEntryPoint('./vendor.js', opts)
  },
  output: {
    path: path.resolve(opts.target),
    publicPath: '/',
    filename: opts.hash ? '[name]-[chunkhash].js' : '[name].js',
    chunkFilename: opts.hash ? '[name]-[chunkhash].js' : '[name].js',
    hashDigestLength: 100,
    hashFunction: 'md5',
    hashDigest: 'hex'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss', '.css'],
    modules: [
      srcPath,
      'node_modules'
    ]
  }
});

const buildConfigFromParts = opts =>
  configBuilders.reduce(
    (result, builder) => mergeConfigs(result, builder(opts)),
    buildConfigBase(opts)
  );

const buildConfig = opts =>
  normalizeConfig(buildConfigFromParts(opts));

export default buildConfig;
