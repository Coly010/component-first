import { Store } from './store';
import { getPrivateProperty } from './utils/testing';

describe('Store', () => {
  describe('Reducers', () => {
    it('should create reducer correctly', () => {
      // ARRANGE
      const store = new Store<{ data: string }>();
      const action = store.createAction('action1');

      // ACT
      store.createReducer(action, (state) => ({
        ...state,
        data: 'MyData',
      }));

      // ASSERT
      const reducers = getPrivateProperty(store, 'reducers');
      expect(action.name in reducers).toBeTruthy();
      expect(reducers[action.name]).toHaveLength(1);
      expect(reducers[action.name][0]({ data: '' })).toEqual({
        data: 'MyData',
      });
    });

    it('should create reducer that allows a payload', () => {
      // ARRANGE
      const store = new Store<{ data: string }>();
      const action = store.createAction<{ value: string }>('action1');

      // ACT
      store.createReducer(action, (state, payload) => ({
        ...state,
        data: payload.value,
      }));

      // ASSERT
      const reducers = getPrivateProperty(store, 'reducers');
      expect(action.name in reducers).toBeTruthy();
      expect(reducers[action.name]).toHaveLength(1);
      expect(
        reducers[action.name][0]({ data: '' }, { value: 'MyData' })
      ).toEqual({
        data: 'MyData',
      });
    });
  });

  describe('Dispatch Action', () => {
    it('should reduce state correctly when an action is dispatched', () => {
      // ARRANGE
      const store = new Store<{ a: string; b: string; c: number }>();
      store['state'] = {
        a: '',
        b: '',
        c: 0,
      };
      const action = store.createAction<{ value: string }>('Action1');
      const action2 = store.createAction<{ value: string }>('Action2');

      store.createReducer(action, (state, payload) => ({
        ...state,
        a: payload.value,
      }));
      store.createReducer(action2, (state, { value }) => ({
        ...state,
        b: value,
      }));

      // ACT
      store.dispatchAction(action2, { value: 'ten' });

      // ASSERT
      expect(store.get()).toEqual({
        a: '',
        b: 'ten',
        c: 0,
      });
    });
  });
});
