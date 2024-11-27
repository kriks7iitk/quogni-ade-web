export {
  getOHLCData,
  getIndexData,
  getStockNames,
  getStrategyNames,
  getStockSignals,
};
import { handleResponse } from '../Utility/responseHandler';

const getOHLCData = (stock) => {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Append the stock parameter to the URL as a query string
  const url = `${import.meta.env.VITE_QUANT_SERVER_HOST}/ohlc?stock='${stock}'&from_date='2024-01-14'&to_date='2024-08-25'`;

  return fetch(url, requestPayload).then(handleResponse);
};

const getIndexData = (stock) => {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = `${import.meta.env.VITE_QUANT_SERVER_HOST}/nse?stock='${stock}'&from_date='2024-01-14'&to_date='2024-08-25'`;
  return fetch(url, requestPayload).then(handleResponse);
};

const getStockNames = () => {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = `${import.meta.env.VITE_QUANT_SERVER_HOST}/distinct_stocks`;

  return fetch(url, requestPayload).then(handleResponse);
};

const getStrategyNames = () => {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = `${import.meta.env.VITE_QUANT_SERVER_HOST}/distinct_strategy`;

  return fetch(url, requestPayload).then(handleResponse);
};

const getStockSignals = (stock, strategyName) => {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('this is name ');
  console.log(strategyName);

  const url = `${import.meta.env.VITE_QUANT_SERVER_HOST}/signal_date_range_data?stock='${stock}'&strategy='${strategyName}'&from_date='2024-01-14'&to_date='2024-08-25'`;

  return fetch(url, requestPayload).then(handleResponse);
};
