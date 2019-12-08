import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JsonObject } from '@angular/compiler-cli/ngcc/src/packages/entry_point';

/**
 * 登录服务
 * @author
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {

  }

  // 检测用户是否登录
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('auth-token');
  }

  // 登录
  login(params: JsonObject) {
    const options: any = {
      headers: new HttpHeaders({
        'api-code': 'adminUserService.login',
      }),
      params: new HttpParams({
        fromObject: {
          params: JSON.stringify(params),
        }
      }),
    };

    return this.http.get('/api/get', options).pipe(map((data: any) => {
      return data;
    }))
  }

  // 退出登录
  logout() {
    localStorage.clear();
  }
}
