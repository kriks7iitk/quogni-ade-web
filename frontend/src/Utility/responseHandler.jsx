import React from 'react';
import { toast } from 'react-hot-toast';
import { isAuthRoutes } from './routes';

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      if (!isAuthRoutes()) {
        if (response.status === 401) {
          if (error?.code == 'auth106') {
            const encodedMessage = encodeURIComponent(
              error?.message || 'An error occurred',
            );
            window.location.href = `/signup?toastMessage=${encodedMessage}`;
          } else {
            const encodedMessage = encodeURIComponent(
              error?.message || 'An error occurred',
            );
            window.location.href = `/signin?toastMessage=${encodedMessage}`;
          }
        } else if (response.status === 403) {
          toast.error('forbidden resource');
        } else {

          if (error?.code == 'auth110') {
            const encodedMessage = encodeURIComponent(
              error?.message || 'An error occurred',
            );
            window.location.href = `/signin?toastMessage=${encodedMessage}`;
          }
        }
      }

      return Promise.reject({ error, data, statusCode: response?.status });
    }
    return data;
  });
}
