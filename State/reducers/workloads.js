const initialState = {
  loading:false,
};

const workloadsReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_WORKLOADS_PENDING':
      return Object.assign({}, state, {
        loading: true
      });

    case 'FETCH_WORKLOADS_SUCCESS':
      return Object.assign({}, state, {
        loading: false,
        savedWorkLoads: action.payload.recipes.map((recipe) => recipe.name)
      });

    case 'FETCH_WORKLOADS_ERROR':
      return Object.assign({}, state, {
        loading: false
      });

  

    default:
      return state;
  }
};

export default workloadsReducer;