const initialState = {
  loading:false,
  solutions:[]
};

const solutionsReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_SOLUTIONS_PENDING':
      return Object.assign({}, state, {
        loading: true
      });

    case 'FETCH_SOLUTIONS_SUCCESS':
      return Object.assign({}, state, {
        loading: false,
        savedSolutions: action.payload.recipes.map((recipe) => recipe.name)
      });

    case 'FETCH_SOLUTIONS_ERROR':
      return Object.assign({}, state, {
        loading: false
      });

    default:
      return state;
  }
};

export default solutionsReducer;