import strategyReducer from "./strategy.reducer";
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import builderHeaderReducer from "./Builderheader.reducer";
import rightDrawerReducer from './right-drawer.reducer';



const rootReducer = combineReducers({
  strategy: strategyReducer,
  builderHeader: builderHeaderReducer,
  rightDrawerData: rightDrawerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;