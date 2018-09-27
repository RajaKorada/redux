import { REDIRECT_CONFLICT, CLOSE_EULA, COUNTRY_CHANGE, TOGGLE_SIZE_BUTTON, 
         FETCH_WORKLOADS, FETCH_DEFAULT_DATA, FETCH_SOLUTION,
         FETCH_GRBOM, FETCH_GR_INPUT, FETCH_BOM, FETCH_CONFIGDETAILS, FETCH_METRICS_DATA,
         ADD_SESSION, UPDATE_SESSION, CHANGE_SESSION, DELETE_SESSION, ERROR_SESSION,
         API_REQUEST, API_REQUEST_POST,
         SAVE_WORKLOAD, SAVE_SOLUTION, SAVE_DATA,
         LOAD_USER_DATA, LOAD_SELECTION,VALIDATE_WORKLOAD, 
         FETCH_RA_BOM, FETCH_COMPARE_SOLUTION, EPA_ACTV_SOLN_CHANGE } from '../constants/actionTypes';
import { serviceUrl,said } from '../../AppConfig';


export const EPAActvSolnChange = ( data ) => ({
  type: EPA_ACTV_SOLN_CHANGE, 
  payload: { data }
});

export const redirectPage = ( isTrue, path ) => ({
  type: REDIRECT_CONFLICT, 
  payload: { isTrue, path }
});

export const addSession = (id,name ) => ({
  type: ADD_SESSION, 
  payload: {id,name}
});

export const changeSession = (id) => ({
  type: CHANGE_SESSION, 
  payload: {id}
});

export const toggleSizeButton = (value) => ({
  type: TOGGLE_SIZE_BUTTON,
  payload: {value}  
});

export const updateSession = (session) => ({
  type: UPDATE_SESSION, 
  payload: {session}
});

export const SaveCurrentSession = () => ({
  type: SAVE_DATA,  
});

export const deleteSession = (id) => ({
  type: DELETE_SESSION, 
  payload: {id}
});

export const errorValidataion = (errorMsg) => ({
  type: ERROR_SESSION,
  payload:{errorMsg}
});

export const updateCountry = (country) => ({
  type: COUNTRY_CHANGE,
  payload:{country}
});
export const updateEULA = (data) => ({
  type: CLOSE_EULA,
  payload:{data}
});

export const refArchSession = ( UserData ) => ({
  type: API_REQUEST_POST,
  payload: {
    url: serviceUrl+'EPA/LoadReferenceArchitectrureSolution',
    data : UserData,
    next: LOAD_SELECTION 
  }
});

export const refArchBOM = ( UserData ) => ({
  type: API_REQUEST_POST,
  payload: {
    url: serviceUrl+'EPA/LoadReferenceArchitectrureSolution',
    data : UserData,
    next: FETCH_RA_BOM 
  }
});

export const fetchCompareSolution = (UserData) => ({
  type: API_REQUEST_POST,
  payload: {
    url: serviceUrl+'EPA/FetchCompareSolution',
    next: FETCH_COMPARE_SOLUTION,
    data: UserData
  }
});

export const fetchMetricsData = () => ({
  type: API_REQUEST,
  payload: {
    url: serviceUrl+'EPA/GetMetricsData',
    next: FETCH_METRICS_DATA 
  }
});

export const fetchWorkloads = () => ({
  type: API_REQUEST,
  payload: {
    url: serviceUrl+'Dummy/getSizerDefaults',
    next: FETCH_WORKLOADS 
  }
});

export const fetchBOMString = (sessionID) => ({
  type: API_REQUEST_POST,
  payload: {
    url: serviceUrl+'SizingEngine/GenerateBillOfMaterial',
    data:sessionID,
    next: FETCH_BOM 
  }
});

export const fetchGRinput=(sessionID)=>({
  type:API_REQUEST_POST,
  payload:{
    url:serviceUrl+'SizingEngine/GenerateGRInput',
    data:sessionID,
    next:FETCH_GR_INPUT  
}
});

export const fetchGRBomInput=(sessionID)=>({
  type:API_REQUEST_POST,
  payload:{
    url:serviceUrl+'SizingEngine/GenerateBOMforGR',
    data:sessionID,
    next:FETCH_GRBOM  
}
});

export const fetchConfigString = (sessionID) => ({
  type: API_REQUEST_POST,
  payload: {
    url: serviceUrl+'SizingEngine/GenerateConfigurationDetails',
    data:sessionID,
    next: FETCH_CONFIGDETAILS 
  }
});

export const fetchDefaultData = () => ({
  type: API_REQUEST,
  payload: {
    // url: 'http://16.100.138.154/api/ExchangeSizer',
    // url: 'http://128.88.150.172:8090/api/ExchangeSizer', 
    url: serviceUrl+said+'/GetSizerDefaults',
    //url: 'http://16.107.49.141/api/CS750VirtSizer/GetDefaultProfiles',
    next: FETCH_DEFAULT_DATA 
  }
});

export const getSolution = (workload) => ({
  type: API_REQUEST_POST,
  payload: {
    url: serviceUrl+'SizingEngine/SizeSolution',
    data: workload,
    next: FETCH_SOLUTION 
  }
});

export const validateWorkload = (url, workload) => ({
  type: API_REQUEST_POST,
  payload: {
    url: url,
    data: workload,
    next: VALIDATE_WORKLOAD 
  }
});

export const saveWorkload = (sessionID) => ({
  type: API_REQUEST_POST,
  payload: {
    url: serviceUrl+'SizingEngine/SaveWorkload',
    data: sessionID,
    next: SAVE_WORKLOAD
  }  
});

export const saveSolution = (sessionID) => ({
  type: API_REQUEST_POST,
  payload: {
    url: serviceUrl+'SizingEngine/SaveSolution',
    data: sessionID,
    next: SAVE_SOLUTION
  }  
});

export const loadSessionList = (userData) => ({
  type: API_REQUEST_POST,
  payload: {
    url: serviceUrl+'SizingEngine/FetchUserData',
    data: userData,
    next: LOAD_USER_DATA
  }  
});

export const loadSessionItem = (userData) => ({
  type: API_REQUEST_POST,
  payload: {
    url: serviceUrl+'SizingEngine/getSelection',
    data: userData,
    next: LOAD_SELECTION
  }  
});


