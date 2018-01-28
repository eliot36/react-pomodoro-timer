import { combineReducers } from 'redux';
import control from './control';
import display from './display';


const reducers = combineReducers({
	// Multiple reducers have to be combined
	control, display
})

export default reducers;