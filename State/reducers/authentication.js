
const initialState = {
  isAuthenticated: false,
  userData: {}
};

const authenticationReducer = (state = initialState, action) => {  
    
  switch (action.type){

    case 'CHECK_LOGIN': {
        return Object.assign({}, state, { 
          isAuthenticated: true,
          userData: action.payload,
        });
    }
    
  } 
    
  return state;
};
export default authenticationReducer;