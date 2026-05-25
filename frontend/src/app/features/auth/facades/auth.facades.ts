import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthApi } from '../apis/auth.api';
import { AuthUser, SignUpPayload } from '../models/auth.model';
import { TokenService } from '../../../services/token.service';
import { ResponseApi } from '../../../utils/types/apiResponse';

@Injectable()
export class AuthFacade {
  public user$: BehaviorSubject<AuthUser | null> = new BehaviorSubject<AuthUser | null>(null);

  constructor(
    private authApi: AuthApi,
    private tokenService: TokenService,
  ) {}

  signIn(email: string, password: string): Observable<ResponseApi<AuthUser>> {
    return this.authApi.signIn(email, password).pipe(
      tap((response) => {
        if (response.data?.token) {
          this.tokenService.setToken(response.data.token);
          this.user$.next(response.data);
        }
      }),
    );
  }

  signUp(payload: SignUpPayload): Observable<ResponseApi<AuthUser>> {
    return this.authApi.signUp(payload).pipe(
      tap((response) => {
        if (response.data?.token) {
          this.tokenService.setToken(response.data.token);
          this.user$.next(response.data);
        }
      }),
    );
  }

  signOut(): void {
    this.tokenService.removeToken();
    this.user$.next(null);
  }
}
