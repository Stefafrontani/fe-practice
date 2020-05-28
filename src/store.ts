import { configureStore } from '@reduxjs/toolkit';
import createDocReducer from './containers/CreateDoc/createDocSlice';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: {
    createDoc: createDocReducer,
  },
});

export default store;