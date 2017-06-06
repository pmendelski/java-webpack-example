// This file must be executed before all others
// See: https://github.com/airbnb/enzyme/issues/58
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('');

global.window = jsdom.window;
global.document = window.document;
global.navigator = window.navigator;
