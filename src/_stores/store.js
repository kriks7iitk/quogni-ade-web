import strategyReducer from "./strategy.reducer";
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import builderHeaderReducer from "./Builderheader.reducer";



const rootReducer = combineReducers({
  strategy: strategyReducer,
  builderHeader: builderHeaderReducer,
  
});

const store = configureStore({
    reducer: rootReducer,

});

export default store;