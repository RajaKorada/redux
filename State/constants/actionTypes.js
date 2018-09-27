export const ADD_SESSION = 'ADD_SESSION';
export const CHANGE_SESSION = 'CHANGE_SESSION';
export const DELETE_SESSION = 'DELETE_SESSION';
export const UPDATE_SESSION = 'UPDATE_SESSION';
export const UPDATE_WORKLOAD = 'UPDATE_WORKLOAD';
export const SAVE_DATA = 'SAVE_DATA';
export const SERVER_ERROR = 'SERVER_ERROR';
export const COUNTRY_CHANGE = 'COUNTRY_CHANGE'
export const TOGGLE_SIZE_BUTTON = 'TOGGLE_SIZE_BUTTON';
export const CLOSE_EULA = 'CLOSE_EULA';
export const ERROR_SESSION = 'ERROR_SESSION';

export const CHECK_LOGIN = 'CHECK_LOGIN';

export const asyncActionType = (type) => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`,
});

// API
export const API_REQUEST = 'API_REQUEST';
export const API_REQUEST_POST = 'API_REQUEST_POST';
export const CANCEL_API_REQUEST = 'CANCEL_API_REQUEST';
export const REDIRECT_CONFLICT = 'REDIRECT_CONFLICT';

export const EPA_ACTV_SOLN_CHANGE = 'EPA_ACTV_SOLN_CHANGE';

// Recipes
export const FETCH_WORKLOADS = asyncActionType('FETCH_WORKLOADS');
export const FETCH_BOM = asyncActionType('FETCH_BOM');
export const FETCH_GR_INPUT = asyncActionType('FETCH_GR_INPUT');
export const FETCH_GRBOM = asyncActionType('FETCH_GRBOM');
export const FETCH_CONFIGDETAILS = asyncActionType('FETCH_CONFIGDETAILS');
export const FETCH_DEFAULT_DATA = asyncActionType('FETCH_DEFAULT_DATA');
export const FETCH_SOLUTION = asyncActionType('FETCH_SOLUTION');
export const SAVE_WORKLOAD = asyncActionType('SAVE_WORKLOAD');
export const SAVE_SOLUTION = asyncActionType('SAVE_SOLUTION');
export const LOAD_USER_DATA = asyncActionType('LOAD_USER_DATA');
export const LOAD_SELECTION = asyncActionType('LOAD_SELECTION');

export const FETCH_METRICS_DATA = asyncActionType('FETCH_METRICS_DATA');
export const FETCH_COMPARE_SOLUTION = asyncActionType('FETCH_COMPARE_SOLUTION');

export const VALIDATE_WORKLOAD = asyncActionType('VALIDATE_WORKLOAD');
export const FETCH_RA_BOM = asyncActionType('FETCH_RA_BOM');

