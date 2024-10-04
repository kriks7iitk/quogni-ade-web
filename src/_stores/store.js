import strategyReducer from "./strategy.reducer";
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';



const rootReducer = combineReducers({
  strategy: strategyReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;