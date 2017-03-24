/* eslint-disable */
import devServer from './webpack-dev-server';
import buildWebpackConfig from './lib/webpack';

const modes = {
  watch: {
    extractAssets: false,
    sourceMaps: true,
    optimize: false,
    hash: false,
    watch: true
  },
  debug: {
    extractAssets: true,
    sourceMaps: true,
    optimize: false,
    hash: true
  },
  prod: {
    extractAssets: true,
    sourceMaps: false,
    optimize: true,
    hash: true
  },
  webjar: {
    target: './build/webjar/static',
    extractAssets: true,
    sourceMaps: false,
    optimize: true,
    hash: true
  }
};

const useDevServer = () =>
  process.argv.some(value => value.endsWith('webpack-dev-server'));

const createConfig = (env = {}) => {
  const mode = env.mode || 'prod';
  const config = modes[mode.toLowerCase()];
  if (!config) throw new Error(`Unrecognized webpack mode: ${mode}`);

  config.target = config.target || './build/web';
  if (useDevServer()) config.devServer = devServer;

  console.log(`Starting webpack in mode: ${mode}`);
  console.log(`Configuration:\n${JSON.stringify(config, null, 2)}`);
  return buildWebpackConfig(config);
}
export default createConfig;
