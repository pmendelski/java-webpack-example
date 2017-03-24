import appConfig from '../../config';

export default {
  design: {
    ios: {
      pictureAspect: 'backgroundAndMargin',
      backgroundColor: '#ffffff',
      margin: '14%'
    },
    desktopBrowser: {},
    windows: {
      pictureAspect: 'noChange',
      backgroundColor: '#da532c',
      onConflict: 'override'
    },
    androidChrome: {
      pictureAspect: 'shadow',
      themeColor: '#b5b5b5',
      manifest: {
        name: appConfig.title,
        display: 'browser',
        orientation: 'notSet',
        onConflict: 'override',
        declared: true
      }
    },
    safariPinnedTab: {
      pictureAspect: 'silhouette',
      themeColor: '#b5b5b5'
    }
  },
  settings: {
    scalingAlgorithm: 'Mitchell',
    errorOnImageTooSmall: false
  }
};
