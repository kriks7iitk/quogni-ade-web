import { useLocation } from 'react-router-dom';

export function isAuthRoutes() {
  const routesList = ['sign-up', 'sign-in'];
  const paths = getPath();

  return routesList.some((item) => paths.includes(item));
}

export function getPath() {
  const path = window.location.pathname;
  const subpath = path.split('/').slice(1);
  return subpath;
}
