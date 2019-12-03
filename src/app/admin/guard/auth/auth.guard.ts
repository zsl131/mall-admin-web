import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemConfigService } from '../../service/system-config.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private systemConfigService: SystemConfigService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;

    return this.systemConfigService.checkInit().pipe(
      map(value => {
        if(value) {
          return true;
        } else {
          this.router.navigateByUrl('/admin/account/initial');
          return false;
        }
      })
    );
  }
}
