// React dependencies
import 'react';
import 'react-dom';
// Theme dependencies
const loadTheme = () => {
  // Issue: https://github.com/Dogfalo/materialize/issues/3812
  // eslint-disable-next-line
  const jquery = require('jquery')
  global.$ = jquery;
  global.jQuery = jquery;
  // eslint-disable-next-line
  require('bootstrap-sass');
};

loadTheme();
