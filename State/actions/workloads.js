import {UPDATE_WORKLOAD} from '../constants/actionTypes';

export const updateWorkload = (element,content ) => ({
  type: UPDATE_WORKLOAD, 
  payload: {element,content}
});
