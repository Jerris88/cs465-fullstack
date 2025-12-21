import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Add JWT only for write requests
  const isWriteRequest = ['POST', 'PUT', 'DELETE'].includes(req.method);

  // Keep GET requests unchanged for public trip list loading
  if (!isWriteRequest) {
    return next(req);
  }

  // Read stored token after login
  const token = localStorage.getItem('travlr-token');

  // Forward unchanged if no token exists
  if (!token) {
    return next(req);
  }

  // Attach Bearer token for secured endpoints
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};