import { merge } from 'lodash';
import generate from './generate';
import customConfig from '../../src/theme/favicons/config';

const destDir = './src/assets/favicons';
const defaultConfig = {
  masterPicture: './src/theme/favicons/favicon.png',
  dest: destDir,
  iconsPath: '/favicons',
  markupFile: `${destDir}/markup.json`
};
const finalConfig = merge({}, defaultConfig, customConfig);

console.log('Generating favicons');
generate(finalConfig)
  .then(() => console.log('Finished'))
  .catch(e => console.log('Error ', e));
