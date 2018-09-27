// import {errorValidataion} from '../actions/sessions';

const errorMiddleware = ({ getState, dispatch }) => (next) => (action) => {
 
// if (action.type === 'ADD_SESSION')
// {
//     if(action.payload.name === undefined || action.payload.name === '' || action.payload.name === null){     
//         dispatch(errorValidataion(true));
//         return;
//     }
//    else{      
//        dispatch(errorValidataion(false));              
//    }        
// }

return next(action);
    
       
};

export default errorMiddleware;