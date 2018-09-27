import { combineReducers } from 'redux';
import sessionsReducer from './sessions';
import workloadsReducer from './workloads';
import solutionsReducer from './solutions';
import authenticationReducer from './authentication';
import sizerWorkload from '../../SizerUI/Redux/reducers/sizerWorkload';
 //import csvirtualsizer  from '../../SizerUI/Redux/reducers/CSVirtualSizer';
 //import nimble from '../../SizerUI/Redux/reducers/nimble';



const rootReducer = combineReducers({ sessions: sessionsReducer,
                                      workloads:workloadsReducer,
                                      solutions: solutionsReducer,
                                      auth: authenticationReducer,
                                      //csvirtualsizer,
                                      //nimble,                                      
                                      sizerWorkload
                                    });

export default rootReducer;