import buildConfig from './config';
import appConfig from '../../src/config';

const defaultOpts = {
  appConfig,
  target: './build',
  extractAssets: true,
  sourceMaps: false,
  optimize: false,
  hash: true
};

const resolveOpts = opts => ({
  ...defaultOpts,
  ...opts
});

const resolveOptsAndBuildConfig = opts =>
  buildConfig(resolveOpts(opts));

export default resolveOptsAndBuildConfig;
