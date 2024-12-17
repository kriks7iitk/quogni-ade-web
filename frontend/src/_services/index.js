export { authenticationService } from './auth.service';
export * as marketDataService from './marketData.service';
export * as oAuthService from './oauth.service';

export const SERVER_HOST =
  process.env.NODE_ENV == 'prod'
    ? `https://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`
    : `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`;
