import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  if (!token) {
    return next(req);
  }

  const decoded = tokenService.decodeToken(token);
  const companyId = decoded?.companyId;

  const shouldInjectCompanyId =
    !!companyId &&
    (req.method === 'POST' || req.method === 'PUT') &&
    req.body !== null &&
    typeof req.body === 'object' &&
    !(req.body instanceof FormData) &&
    !Array.isArray(req.body) &&
    !('companyId' in (req.body as Record<string, unknown>));

  const body = shouldInjectCompanyId
    ? { ...(req.body as Record<string, unknown>), companyId }
    : req.body;

  const authReq = req.clone({
    body,
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
