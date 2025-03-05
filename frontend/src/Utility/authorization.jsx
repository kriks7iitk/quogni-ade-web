import { authenticationService } from '../_services/auth.service';
import { isAuthRoutes } from './routes';
import { convertSnakeCaseToCamelCase } from './utility';

export function authorize() {
  const isAuthRoute = isAuthRoutes();
  authenticationService.validateSession().then((response) => {
    const data =  convertSnakeCaseToCamelCase(response);
    authenticationService.updateCurrentSession({
      user: data?.user,
      session: data?.session,
    });

    if (isAuthRoute) {
      window.location.href = '/workspace/tools';
    }
    
  })
  .catch(() => {
    if (!isAuthRoute) {
      window.location.href = '/sign-in';
    }
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
  const token = sessionStorage.getItem('q-auth-token');
  return !!token;
}

export function extractToken() {
  return sessionStorage.getItem('q-auth-token');
}
