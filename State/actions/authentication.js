import { CHECK_LOGIN } from '../constants/actionTypes';
import { serviceUrl } from '../../AppConfig';

export const checkLogin = ( userData ) => ({
  type: CHECK_LOGIN, 
  payload: { username: userData.userName, password: userData.password }
});