/* eslint-disable */
import slow from 'connect-slow';
import morgan from 'morgan';

export default {
  historyApiFallback: true,
  setup: (app) => {
    app.use(morgan('tiny'));
    app.use(slow({
      url: /\/api\//i,
      delay: 1000
    }));
  },
  proxy: {
    '/api/**': {
      target: 'http://localhost:7070',
      onProxyReq: (proxyReq, req) =>
        console.log('PROXY', req.originalUrl)
    }
  }
};
