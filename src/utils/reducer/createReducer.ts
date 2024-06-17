import { combineReducers } from 'redux';

import { IExtendedStore, IInjectReducerArgs, IReducers } from '../../store/store.types';
import appSlice from '../../containers/App/appSlice';

import { reducerKeyMap } from '../../containers/App/constants';

// static reducers
export const staticReducers: IReducers = {
  [reducerKeyMap.common]: appSlice,
};

const reducerInjector = (store: IExtendedStore) => ({
  injectReducer: ({ reducerKey, reducer }: IInjectReducerArgs) => {
    store.asyncReducers[reducerKey] = reducer;

    store.replaceReducer(
      combineReducers({
        ...staticReducers,
        ...store.asyncReducers,
      })
    );
  },
});

export default reducerInjector;
