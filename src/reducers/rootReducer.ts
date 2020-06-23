import { combineReducers } from 'redux';
import { 
    useSelector as useReduxSelector, 
    TypedUseSelectorHook 
} from 'react-redux';
import createDocReducer from './createDocReducer';

const rootReducer = combineReducers({
    createDoc: createDocReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default rootReducer;
