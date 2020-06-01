import { combineReducers } from 'redux';
import createDocReducer from './createDocReducer';

const rootReducer = combineReducers({
    createDoc: createDocReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
