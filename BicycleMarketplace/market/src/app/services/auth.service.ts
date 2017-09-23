import { Injectable } from '@angular/core';
import { User } from '../user';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http, private cookieService: CookieService) {}

  login(user: User): Promise<User> {
    console.log('In Login Service Call!')
    return this.http.post('/api/auth/login', user)
    .map(response => response.json())
    .toPromise();
  }

  register(user: User): Promise<User> {
    return this.http.post('/api/auth/register', user)
    .map(response => response.json())
    .toPromise();
  }

  logout(): Promise<boolean> {
    return this.http.delete('api/auth/logout')
    .map(response => response.json())
    .toPromise();
  }

  isAuthorized(): boolean{
    const expired = parseInt(this.cookieService.get('expiration'), 10);
    const userId = this.currentUserId();
    const session = this.cookieService.get('session');
    const isBlocked = parseInt(this.cookieService.get('blocked'));
    // console.log('expired: ', expired, 'userId: ', userId, 'session: ', session)

    return Boolean(session && expired && userId && expired > Date.now() && isBlocked < Date.now());
  }

  currentUserId(): string {
    return this.cookieService.get('userId');
  }

  blockUser(user: User): Promise<User> {
    console.log('In Block User!')
    return this.http.post('/api/auth/block', user)
    .map(response => response.json())
    .toPromise();
  }

  isBlocked(): boolean{
    const isBlocked = parseInt(this.cookieService.get('blocked'));
    return Boolean(isBlocked > Date.now());
  }

}
