/* eslint import/first: 0 */
import './document';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount, render } from 'enzyme';
import fetchMock from 'fetch-mock';
import mountWithStore from './utils/mount';
import { createMockStore, createAppStore } from './utils/store';
import * as testTypes from './testTypes';

chai.config.includeStack = true;
chai.config.showDiff = true;
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiSubset);
chai.use(chaiEnzyme());

global.__DEV = false;
global.__TEST = true;
global.expect = chai.expect;
global.sinon = sinon;
global.shallow = shallow;
global.mountWithStore = mountWithStore;
global.mount = mount;
global.render = render;
global.fetchMock = fetchMock;
global.createStore = createMockStore;
global.createAppStore = createAppStore;

Object.assign(global, testTypes);
Object.keys(global.window)
  .filter(key => window.hasOwnProperty(key) && !(key in global))
  .forEach((key) => {
    global[key] = window[key];
  });
