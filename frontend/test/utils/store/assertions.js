/* eslint-disable no-param-reassign */
const createExpectActions = store =>
  (actions) => {
    const expectedActions = Array.isArray(actions) ? actions : [actions];
    const actualActions = store.getActions();
    expectedActions.forEach((action, i) =>
      expect(actualActions[i]).containSubset(action));
  };

const createExpectNoActions = store =>
  () => {
    const actualActions = store.getActions();
    expect(actualActions).to.be.empty;
  };

const setupAssertions = (store) => {
  store.expectActions = createExpectActions(store);
  store.expectNoActions = createExpectNoActions(store);
  return store;
};

export default setupAssertions;
