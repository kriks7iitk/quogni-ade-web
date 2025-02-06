export { authenticationService } from './auth.service';
export * as marketDataService from './marketData.service';
export { oAuthService } from './oauth.service';
export { userService } from './user.service';
export { eventAgentService } from './eventAgent.service'
export { aiAgent } from './agent.service'

export const SERVER_HOST =
  process.env.NODE_ENV == 'prod'
    ? `https://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`
    : `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`;


  export const AI_SERVER_HOST = 
  process.env.NODE_ENV == 'prod'
  ? `https://${import.meta.env.VITE_AI_SERVER_URL}:${import.meta.env.VITE_AI_SERVER_PORT}`
  : `http://${import.meta.env.VITE_AI_SERVER_URL}:${import.meta.env.VITE_AI_SERVER_PORT}`;
