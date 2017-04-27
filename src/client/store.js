
export const bindDispatch = (action, dispatch) => (...params) => dispatch(action(...params));

export const createStore = (reducer, initialState) => {
  let state = initialState;
  const listeners = [];
  const listen = cb => listeners.push(cb);
  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(cb => cb(state));
    console.log(state);
    return action;
  };
  return { dispatch, getState, listen, };
};
