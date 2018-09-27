const logMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  if(!action.type.indexOf("CSVS")>=1)
  console.log(`Action: ${ action.type }`);

  next(action);
};

export default logMiddleware;