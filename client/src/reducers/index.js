/* istanbul ignore file */

import { combineReducers } from 'redux';
import auth from './auth';
import restaurant from './restaurant';

export default combineReducers({ auth, restaurant });
