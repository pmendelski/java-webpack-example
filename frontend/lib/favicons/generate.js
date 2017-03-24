import rfgApi from 'rfg-api';
import fs from 'fs';

const API_KEY = 'eabf77c98d6bd1eea81fb58be7895c42dafc2b21';

const createRequest = (rfg, params) =>
  rfg.createRequest({
    apiKey: API_KEY,
    masterPicture: params.masterPicture,
    iconsPath: params.iconsPath,
    design: params.design,
    settings: params.settings,
    versioning: params.versioning
  });

const writeMarkupFile = (dest, markup) =>
  new Promise((resolve, reject) => {
    const markupJson = JSON.stringify(markup, null, 2);
    fs.writeFile(dest, markupJson, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });

const generateFavicon = params =>
  new Promise((resolve, reject) => {
    console.log('Generating favicons from', params.masterPicture);
    console.log('It may take few seconds...');
    const rfg = rfgApi.init();
    const request = createRequest(rfg, params);
    rfg.generateFavicon(request, params.dest, (err, data) => {
      if (err) return reject(err);
      return writeMarkupFile(params.markupFile, data)
        .then(resolve)
        .catch(reject);
    });
  });

export default generateFavicon;
