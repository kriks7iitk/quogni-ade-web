import { authenticationService } from '../_services/auth.service';
import { isAuthRoutes } from './routes';

export function authorize() {
  const isAuthRoute = isAuthRoutes();
  authenticationService.validateSession().then((data) => {
    authenticationService.updateCurrentSession({ user: data });

    if (isAuthRoute) window.location.href = '/dashboard';
  });
}

export function generateHeader() {
  const token = extractToken();

  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token?.replace(/^"|"$/g, '')}` }),
  };
}

export function checkForSessionExist() {
  const token = sessionStorage.getItem('ps-auth-token');
  return !!token;
}

export function extractToken() {
  return sessionStorage.getItem('ps-auth-token');
}
