import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { reducerKeyMap } from './constants';

interface ICommonState {}

export const appSlice = createSlice({
  name: reducerKeyMap.common,
  initialState: {} as ICommonState,
  reducers: {
    setCommonReducerData: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCommonReducerData } = appSlice.actions;

export default appSlice.reducer;
