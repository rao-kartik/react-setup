import { configureStore, combineReducers } from '@reduxjs/toolkit';

import reducerInjector, { staticReducers } from '../utils/reducer/createReducer';

import { IExtendedStore } from './store.types';

const configureAppStore = () => {
  const store = configureStore({
    reducer: combineReducers(staticReducers),
  }) as IExtendedStore;

  // injecting reducers dynamically
  store.asyncReducers = {};

  store.injectReducer = reducerInjector(store).injectReducer;

  return store;
};

const store = configureAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
