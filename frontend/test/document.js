// This file must be executed before all others
// See: https://github.com/airbnb/enzyme/issues/58
import jsdom from 'jsdom';

global.document = jsdom.jsdom('');
global.window = document.defaultView;
global.navigator = window.navigator;
