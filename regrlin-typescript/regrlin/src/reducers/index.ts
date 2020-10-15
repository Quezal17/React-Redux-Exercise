import counterReducer from './counter';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    counter: counterReducer
});

export type RootState = ReturnType<typeof allReducers>;
export default allReducers;