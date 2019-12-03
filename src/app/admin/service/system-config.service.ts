import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonObject } from '@angular/compiler-cli/ngcc/src/packages/entry_point';

/**
 * 系统配置服务
 * @author silent
 */
@Injectable({
  providedIn: 'root',
})
export class SystemConfigService {
  constructor(private http: HttpClient) {

  }

  /**
   * 检测系统是否初始化
   */
  checkInit(): Observable<boolean> {
    const options: any = {
      headers: new HttpHeaders({
        'api-code': 'baseAppConfigService.checkInit',
      }),
      params: new HttpParams({
        fromObject: {
          params: "{}",
        }
      }),
    };

    return this.http.get(`/api/get`, options).pipe(map((data:any) => {
      return data.res == true;
    }));
  }

  initSystem(params: JsonObject) {
    const options: any = {
      headers: new HttpHeaders({
        'api-code': 'baseAppConfigService.initSystem',
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


}
