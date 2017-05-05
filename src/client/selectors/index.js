import R from 'ramda';
import { createSelector } from 'reselect';


const getHistory = state => state.history;
export const getVisibleHistory = createSelector(
  getHistory,
  history => history.slice(-20).reverse().map(R.identity),
);


