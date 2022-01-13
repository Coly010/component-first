import { Store } from './store';

describe('Store', () => {
  describe('Reducers', () => {
    it('should create reducer correctly', () => {
      // ARRANGE
      const store = new Store<{ data: string }>();
      const actionName = 'Action1';

      // ACT
      store.createReducer(actionName, (state) => ({
        ...state,
        data: 'MyData',
      }));

      // ASSERT
      expect(actionName in store.reducers).toBeTruthy();
      expect(store.reducers[actionName]).toHaveLength(1);
      expect(store.reducers[actionName][0]({ data: '' })).toEqual({
        data: 'MyData',
      });
    });

    it('should create reducer that allows a payload', () => {
      // ARRANGE
      const store = new Store<{ data: string }>();
      const actionName = 'Action1';

      // ACT
      store.createReducer(actionName, (state, payload) => ({
        ...state,
        data: payload.value,
      }));

      // ASSERT
      expect(actionName in store.reducers).toBeTruthy();
      expect(store.reducers[actionName]).toHaveLength(1);
      expect(
        store.reducers[actionName][0]({ data: '' }, { value: 'MyData' })
      ).toEqual({
        data: 'MyData',
      });
    });
  });

  describe('Dispatch Action', () => {
    it('should reduce state correctly when an action is dispatched', () => {
      // ARRANGE
      const store = new Store<{ a: string; b: string; c: number }>();
      store.state = {
        a: '',
        b: '',
        c: 0,
      };
      const actionName = 'Action1';
      const actionName2 = 'Action2';

      store.createReducer(actionName, (state, payload) => ({
        ...state,
        a: payload.value,
      }));
      store.createReducer(actionName2, (state, payload) => ({
        ...state,
        b: payload.value,
      }));

      // ACT
      store.dispatchAction(actionName2, { value: 'ten' });

      // ASSERT
      expect(store.state).toEqual({
        a: '',
        b: 'ten',
        c: 0,
      });
    });
  });
});
