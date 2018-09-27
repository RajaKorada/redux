import find from 'array.prototype.find';

const initialState = {
  EULAPopUpState:true,
  activeSession: '',
  sessions:[],
  sessionDefaults:{
    workload:'',
    inputs:'',
    whatsNew:'',
    additionalInfo:'',
    Countries:''
  },
  userData:[],
  sessionCount: 0,
  isLoading:false,
  LoadingMsg: '',
  Country:'United States',
  overrideMsg: { isEnabled: false, msg:'' },
  overrideSolMsg: { isEnabled: false, msg:'' },
  notificationMsg: { isEnabled: false, msg:'' },
  redirect: { isEnabled: false, path:'' },
     
};

const sessionsReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case'ADD_SESSION':
      console.log(state);
      var currtime = new Date();
      // var newAlias = currtime.getMilliseconds();
      var newAlias = state.sessionCount+1;
      let newSession = {};

      if(action.payload.name.indexOf('Default Session') !== 0) {
         newSession = { 
                        id: action.payload.id, 
                        alias:action.payload.name, 
                        workload:'', 
                        treeView:'',
                        bomView:'',
                        configView:'',
                        GRInput:'',
                        GRBomInput:'',
                        isSizeEnabled:false,
                        globalError: { isError: false, errorMsg: ''},   
                        EPAArray:[]                     
                      };
      }else{
         newSession = { 
                        id: action.payload.id,                         
                        alias:action.payload.name +' ('+newAlias+') ' ,
                        workload:'', 
                        treeView:'',
                        bomView:'',
                        configView:'',
                        GRInput:'',
                        GRBomInput:'',
                        isSizeEnabled:false,
                        globalError: { isError: false, errorMsg: ''},     
                        EPAArray:[]                 
                      };
      }
      
      return Object.assign({}, state, {         
            activeSession :newSession,
            sessions: state.sessions.concat(newSession),
            sessionCount: newAlias
    });

    case 'CHANGE_SESSION':
        console.log('CHANGE_SESSION')
        console.log(state);
        return Object.assign({}, state, {       
        activeSession : find(state.sessions,function(value) {
                        if(value.id === action.payload.id)
                          return value;
                        })
    });

    case 'COUNTRY_CHANGE':
        return Object.assign({}, state, {       
        Country : action.payload.country
    });
    
    case 'UPDATE_SESSION':
      return Object.assign({}, state, {
          sessions : state.sessions.map((item) => item.id !== action.payload.session.id ? item : Object.assign({}, item, { alias: action.payload.session.alias }))
    });

    case 'SAVE_DATA':
    console.log('saveData')
    console.log(state);
      return Object.assign({}, state, {
          sessions : state.sessions.map((item) => item.id !== state.activeSession.id ? item : {...state.activeSession})
    });

    case 'DELETE_SESSION':
     return Object.assign({}, state, {
       sessions: state.sessions.filter((value, index) => {       
            if(value.id !== action.payload.id)
               return value;         
       }),
       activeSession : { ...state.activeSession,
         id : (action.payload.id === state.activeSession.id) ? '' : state.activeSession.id, 
         alias : (action.payload.id === state.activeSession.id) ? '' : state.activeSession.alias, 
         workload : (action.payload.id === state.activeSession.id) ? '' : state.activeSession.workload, 
         treeView : (action.payload.id === state.activeSession.id) ? '' : state.activeSession.treeView, 
         bomView : (action.payload.id === state.activeSession.id) ? '' : state.activeSession.bomView, 
         configView : (action.payload.id === state.activeSession.id) ? '' : state.activeSession.configView, 
         GRInput : (action.payload.id === state.activeSession.id) ? '' : state.activeSession.GRInput, 
         GRBomInput : (action.payload.id === state.activeSession.id) ? '' : state.activeSession.GRBomInput       
                                         
       }  
    });

    case 'ERROR_SESSION':
     // return Object.assign({}, state, {
     //   globalError: action.payload.errorMsg
     // });

     //  return Object.assign({}, state, {
     //      sessions : state.sessions.map((item) => item.id !== state.activeSession.id ? item : Object.assign({}, item, { globalError: action.payload.errorMsg }))
     //  });
     return{
        ...state,
           activeSession : {...state.activeSession, globalError:action.payload.errorMsg}
    }

    case 'TOGGLE_SIZE_BUTTON':     
     return{
        ...state,
           activeSession : {...state.activeSession, isSizeEnabled: action.payload.value}
    }

    case 'FETCH_DEFAULT_DATA_PENDING':
      return Object.assign({}, state, {
       isLoading: true,
       LoadingMsg: 'Please wait while fetching the Default data.'
    });

    case 'FETCH_DEFAULT_DATA_SUCCESS':
      console.log(action.payload);
      return Object.assign({}, state, {        
       sessionDefaults: {workload:action.payload.workload.Workload, inputs:action.payload.input, whatsNew:action.payload.whatsNew, additionalInfo:action.payload.additionalInfo,Countries: action.payload.Countries},
       isLoading:false,
       LoadingMsg: ''
    });

    case 'FETCH_SOLUTION_PENDING':
      return Object.assign({}, state, {
       isLoading: true,
       LoadingMsg: 'Please wait while Sizing the Solution.'
    });

    case 'FETCH_SOLUTION_SUCCESS':
       console.log(action);
       var actvSession = state.activeSession;
       actvSession.treeView = action.payload;
       return {
         ...state,
           activeSession: actvSession,
           sessions: state.sessions.map( (item) => item.id !== state.activeSession.id ? item : Object.assign({}, actvSession) ),
           isLoading: false,
           LoadingMsg: ''         
       }

    //     return Object.assign({}, state, {
    //       activeSession : Object.assign({}, state.activeSession, { treeView: action.payload }),
    //       // sessions: 
    //       isLoading:false,
    //       LoadingMsg: ''
    // });
     
    case 'FETCH_BOM_PENDING':
      return Object.assign({}, state, {
       isLoading: true,
       LoadingMsg: 'Please wait while fetching the Bill of material.'
    });
     
    case 'FETCH_BOM_SUCCESS':
     return{
        ...state,
        activeSession : {...state.activeSession,bomView:action.payload},
         isLoading:false,
         LoadingMsg: ''
    }

    case 'FETCH_CONFIGDETAILS_PENDING':
      return Object.assign({}, state, {
       isLoading: true,
       LoadingMsg: 'Please wait while fetching the Configuration details.'
    });

    case 'FETCH_CONFIGDETAILS_SUCCESS':
     return{
        ...state,
        activeSession : {...state.activeSession,configView:action.payload},
        isLoading:false,
        LoadingMsg: ''
    }
    
    case 'FETCH_GR_INPUT_PENDING':
      return Object.assign({}, state, {
       isLoading: true,
       LoadingMsg: 'Please wait while fetching the Configuration details.'
    });

    case 'FETCH_GR_INPUT_SUCCESS':
     return{
        ...state,
        activeSession : {...state.activeSession,GRInput:action.payload.GraphicalInputs},
        isLoading:false,
        LoadingMsg: ''
    }

    case 'FETCH_GRBOM_PENDING':
      return Object.assign({}, state, {
       isLoading: true,
       LoadingMsg: 'Please wait while fetching the Configuration details.'
    });

    case 'FETCH_GRBOM_SUCCESS':
      console.log(action);
      return{
        ...state,
        activeSession : {...state.activeSession,GRBomInput:action.payload.Solution},
        isLoading:false,
        LoadingMsg: ''
    }

    case 'SAVE_WORKLOAD_PENDING':
      return Object.assign({}, state, {
       isLoading: true,
       LoadingMsg: 'Please wait while saving the current workload into the database.'
    });

    case 'SAVE_WORKLOAD_SUCCESS':
      console.log(action);
      return Object.assign({}, state, {
       isLoading: false,
       LoadingMsg: '',
        overrideMsg:{isEnabled:false, msg:''},
        notificationMsg:{isEnabled:true,msg:action.payload}
    });

    case 'REDIRECT_CONFLICT':
      return Object.assign({}, state, {
      redirect: { isEnabled: action.payload.isTrue, path: action.payload.path }
    });

    case 'WORKLOAD_CONFLICT':
      return Object.assign({}, state, {
       isLoading: false,
       LoadingMsg: '',
       overrideMsg:{isEnabled:true, msg:'The Workload with this name already exists in the database. Would you like to replace it?'}
    });

    case 'SOLUTION_CONFLICT':
      return Object.assign({}, state, {
       isLoading: false,
       LoadingMsg: '',
       overrideSolMsg:{isEnabled:true, msg:'The Solution with this name already exists in the database. Would you like to replace it?'}
    });

    case 'DISMISS_CONFLICTS':
    {
       return Object.assign({}, state, {   
       overrideMsg:{isEnabled:false, msg:''},
       overrideSolMsg:{isEnabled:false, msg:''}
    });
    }

    case 'DISMISS_TOAST':
    {
       return Object.assign({}, state, {   
      notificationMsg:{isEnabled:false,msg:''}
    });
    }

    case 'SAVE_SOLUTION_PENDING':
      return Object.assign({}, state, {
       isLoading: true,
       LoadingMsg: 'Please wait while saving the current solution into the database.'
    });

    case 'SAVE_SOLUTION_SUCCESS':
      console.log(action);
      return Object.assign({}, state, {
       isLoading: false,
       LoadingMsg: '',
       overrideSolMsg:{isEnabled:false,msg:''},
       notificationMsg:{isEnabled:true,msg:action.payload}
    });
   
    case 'LOAD_USER_DATA_PENDING':
      return Object.assign({}, state, {
       isLoading: true,
       LoadingMsg: 'Please wait while fetching the data from database.'
    });

   case 'LOAD_USER_DATA_SUCCESS':
     console.log(action);
      return Object.assign({}, state, {
       isLoading: false,
       LoadingMsg: '',
       userData:action.payload
   });

   case 'LOAD_SELECTION_PENDING':
      return Object.assign({}, state, {
       isLoading: true,
       LoadingMsg: 'Please wait while loading the user selection.'
   });

   case 'UPDATE_Active_WORKLOAD': 
   return Object.assign({}, state, {
       activeSession :{ ...state.activeSession,       
         workload : action.payload,                                                      
       }  
   });

   case 'LOAD_SELECTION_SUCCESS':
     console.log(action);
     var atvSess = { 
                        id: '', 
                        alias: '', 
                        workload: JSON.parse(JSON.stringify(state.sessionDefaults.workload)), 
                        treeView: '',
                        bomView: '',
                        configView: '',
                        GRInput: '',
                        GRBomInput: '',
                        globalError: { isError: false, errorMsg: ''},
                        isSizeEnabled: false
                        // isSizeEnabled: true,
                   };   

     atvSess.id = action.payload.SessionID;
     atvSess.alias = action.payload.Alias;
     atvSess.workload.UserInputs = action.payload.Workload.UserInputs;

    //  if( atvSess.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] === '' ||
    //      atvSess.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] === null ){
    //      atvSess.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] = '';
    //  }

    //  var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      
    //  if( atvSess.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] !== '' &&
    //     !reg.test( atvSess.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] ) ){
    //     atvSess.isSizeEnabled = false;
    //  }

    //  if( atvSess.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] === '' ||
    //      atvSess.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] === null ){
    //      atvSess.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] = '';
    //      atvSess.isSizeEnabled = true;
    //  }else{
    //    if(reg.test( atvSess.workload.UserInputs.Environments.ProductionEnvironment.OracleProfileData['RequestorEmail'] ) ){
    //      atvSess.isSizeEnabled = true;
    //    }else{
    //      atvSess.isSizeEnabled = false;
    //    }
    //  }

    //  if( atvSess.workload.UserInputs.Environments.ProductionEnvironment['ProcessorSelected'] === 'Select Processor' ){
    //     atvSess.isSizeEnabled = false;
    //  }

    //  if( atvSess.workload.UserInputs.Environments.OtherEnvironments['TestQA']['@dedicated'] === 'True' && 
    //      atvSess.workload.UserInputs.Environments.OtherEnvironments['TestQA']['TestProcessor'] === 'Select Processor' ||
    //      atvSess.workload.UserInputs.Environments.OtherEnvironments['Dev']['@dedicated'] === 'True' && 
    //      atvSess.workload.UserInputs.Environments.OtherEnvironments['Dev']['DevProcessor'] === 'Select Processor' ||
    //      atvSess.workload.UserInputs.Environments.OtherEnvironments['SandBox']['@dedicated'] === 'True' && 
    //      atvSess.workload.UserInputs.Environments.OtherEnvironments['SandBox']['SandBoxProcessor'] === 'Select Processor' ){
    //      atvSess.isSizeEnabled = false;
    //  } 
     if(action.payload.TreeView === null){
          atvSess.treeView = "";
     }else{
       atvSess.treeView = action.payload.TreeView;
     }
     var SessionAvailable = 0;
     var alias;
  
     state.sessions.forEach(function(item){
        if(item.alias.toString().indexOf(atvSess.alias) >= 0){
        SessionAvailable++;      
      }
     });

     //  return Object.assign({}, state, {     
      //   // sessions:state.sessions.map((item) => item.id !== state.activeSession.id ? item : Object.assign(atvSess)),
      //   sessions: state.sessions.concat(atvSess),
      //   activeSession: atvSess,
      //   isLoading: false,
      //   LoadingMsg: '',       
     // });

     if(SessionAvailable > 0){

       atvSess.alias = atvSess.alias+' ('+SessionAvailable+')';

       return Object.assign({}, state, {     
      //  sessions: state.sessions.map((item) => item.id !== atvSess.id ? item : Object.assign(atvSess)),
        sessions: state.sessions.concat(atvSess),
        activeSession: atvSess,
        isLoading: false,
        LoadingMsg: '',       
      });
     }else{       
       return Object.assign({}, state, {     
          // sessions:state.sessions.map((item) => item.id !== state.activeSession.id ? item : Object.assign(atvSess)),
          sessions: state.sessions.concat(atvSess),
          activeSession: atvSess,
          isLoading: false,
          LoadingMsg: '',       
        });
   }
   
   case 'SERVER_ERROR':
      return Object.assign({}, state, {
       isLoading: false,
       LoadingMsg: ''
   });
    case 'CLOSE_EULA':
    console.log(action.payload.data);
      return Object.assign({}, state, {
       EULAPopUpState:action.payload.data

   });

   case 'EPA_MULTIPLE_SOLUTIONS_SUCCESS':
    var actvSession = state.activeSession;
    actvSession.treeView = action.payload.data;
    actvSession.EPAArray = action.payload.multipleSolutions;
    return Object.assign({}, state, {
         ...state,
           activeSession: actvSession,
           sessions: state.sessions.map( (item) => item.id !== state.activeSession.id ? item : Object.assign({}, actvSession) ),
           isLoading: false,
           LoadingMsg: ''                
      });

  }
    return state;
  };
       
export default sessionsReducer;
