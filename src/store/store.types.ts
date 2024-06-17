import { EnhancedStore } from '@reduxjs/toolkit';
import { Reducer } from 'redux';

export interface IReducers {
  [key: string]: any;
}

export interface IInjectReducerArgs {
  reducerKey: string;
  reducer: Reducer;
}

export interface IExtendedStore extends EnhancedStore<any, any, any> {
  asyncReducers: IReducers;
  injectReducer: ({ reducerKey, reducer }: IInjectReducerArgs) => void;
}
