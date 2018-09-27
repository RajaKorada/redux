import $ from 'jquery';
import {said} from '../../AppConfig'; 
import {errorValidataion} from '../actions/sessions';

const canceled = {};

const apiMiddleware = ({ dispatch }) => (next) => (action) => {

  const handleResponse = (data) => {    
       
    if (action.cancelable && canceled[action.cancelable]) {
      return;
    }

    if(data.isError && action.payload.next.ERROR === 'VALIDATE_WORKLOAD_ERROR')
    {
       var obj ={ isError:true, errorMsg:data.Message};        
       dispatch(errorValidataion(obj));
    }
    else if(action.payload.next.ERROR === 'VALIDATE_WORKLOAD_ERROR' && !data.isError ){
       var obj ='';
       dispatch(errorValidataion(obj));
    }

    if(data === 'WORKLOAD_CONFLICT')
    {
      dispatch({ type: 'WORKLOAD_CONFLICT', payload: data })
    }
    else if(data === 'SOLUTION_CONFLICT')
    {
      dispatch({ type: 'SOLUTION_CONFLICT', payload: data })
    }
        else if(action.payload.next.SUCCESS === 'FETCH_SOLUTION_SUCCESS' && said === "EPA")
    {        
        var multipleSolutions = [];
          
        var WdoConfiguration = {GRBomInput:'',GRInput:'',bomView:'',configView:'',treeView:''}
          
        var Traditional= {GRBomInput:'',GRInput:'',bomView:'',configView:'',treeView:''}                

        if(Array.isArray(data.Solutions.Solution))        
        {
          let toReducer = '';

          multipleSolutions = data.Solutions.Solution.map((item)=>{
            if(item.SolProfile['#text']== 'WDO Config')
            {
               var temp = JSON.parse(JSON.stringify(data));
               temp.Solutions.Solution = item;
               WdoConfiguration.treeView = temp;
               toReducer = WdoConfiguration;
               return WdoConfiguration;
            }
            else if (item.SolProfile['#text']== 'Traditional')
            {
               var temp = JSON.parse(JSON.stringify(data));
               temp.Solutions.Solution = item;
               Traditional.treeView = temp;
              return Traditional;
            }
          });

          var obj = {
          data:toReducer.treeView,
          multipleSolutions
          }


          dispatch({ type: 'EPA_MULTIPLE_SOLUTIONS_SUCCESS', payload: obj })
        }
        else{
          dispatch({ type: action.payload.next.SUCCESS, payload: data })
        }
    } 
   else{
      dispatch({ type: action.payload.next.SUCCESS, payload: data })
    }

  };
  if (action.type === 'API_REQUEST') {
 
    fetch(action.payload.url)
      .then((response) => response.json())
      .then(handleResponse);
 
    dispatch({ type: action.payload.next.PENDING });
  }

  if (action.type === 'API_REQUEST_POST') {
      
    $.ajax({
       type: 'POST',
       url: action.payload.url,
       dataType: 'json',
       contentType: 'application/json; charset=utf-8',
       data: JSON.stringify(action.payload.data),     
       success: function (response){
        handleResponse(response);        
       },
       error: function (response){
         console.log(response);
         dispatch({ type: 'SERVER_ERROR', payload: response })
       }
    });

      // fetch(action.payload.url,{
      //     method: 'POST',
      //     dataType: 'json',
      //     contentType: 'application/json',
      //     body: JSON.stringify(action.payload.data)
      // })
      // .then((response) => response.json())
      // .then(handleResponse);    
 
    dispatch({ type: action.payload.next.PENDING });
  }

  if (action.type === 'CANCEL_API_REQUEST') {
    canceled[action.id] = true;
    setTimeout(() => delete canceled[action.id], 5000);
  }


  return next(action);
};

export default apiMiddleware;
