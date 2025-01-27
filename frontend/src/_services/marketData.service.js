import { handleResponse } from '../Utility/responseHandler';

export const marketDataService = {
  getOHLCData,
  getIndexData,
  getStockNames,
  getStrategyNames,
  getStockSignals,
};

function getOHLCData(stock) {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add Authorization header if needed
      Authorization: `Bearer ${localStorage.getItem('ps_auth_token')}`,
    },
  };

  // Correct URL with proper query parameter formatting
  const url = `${import.meta.env.VITE_QUANT_SERVER_HOST}/ohlc?stock=${stock}&from_date=2024-01-14&to_date=2024-08-25`;

  return fetch(url, requestPayload).then(handleResponse);
}

function getIndexData(stock) {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ps_auth_token')}`,
    },
  };

  const url = `${import.meta.env.VITE_QUANT_SERVER_HOST}/nse?stock=${stock}&from_date=2024-01-14&to_date=2024-08-25`;

  return fetch(url, requestPayload).then(handleResponse);
}

function getStockNames() {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ps_auth_token')}`,
    },
  };

  const url = `${import.meta.env.VITE_QUANT_SERVER_HOST}/distinct_stocks`;

  return fetch(url, requestPayload).then(handleResponse);
}

function getStrategyNames() {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ps_auth_token')}`,
    },
  };

  const url = `${import.meta.env.VITE_QUANT_SERVER_HOST}/distinct_strategy`;

  return fetch(url, requestPayload).then(handleResponse);
}

function getStockSignals(stock, strategyName) {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('ps_auth_token')}`,
    },
  };


  const url = `${import.meta.env.VITE_QUANT_SERVER_HOST}/signal_date_range_data?stock=${stock}&strategy=${strategyName}&from_date=2024-01-14&to_date=2024-08-25`;

  return fetch(url, requestPayload).then(handleResponse);
}
