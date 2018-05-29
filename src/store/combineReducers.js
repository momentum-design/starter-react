import { combineReducers } from 'redux';
import loginReducer from '../components/Login/reducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  user: loginReducer,
  routing: routerReducer
});

export default rootReducer;
