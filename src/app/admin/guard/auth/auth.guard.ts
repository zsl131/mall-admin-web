import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemConfigService } from '../../service/system-config.service';
import { map } from 'rxjs/operators';
import { LoginService } from '../../service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private systemConfigService: SystemConfigService, private loginService: LoginService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;

    return this.systemConfigService.checkInit().pipe(
      map(value => {
        if(value) {
          return this.checkLogin(url);
        } else {
          this.router.navigateByUrl('/admin/account/initial');
          return false;
        }
      })
    );
  }

  checkLogin(url: string): boolean {
    if(this.loginService.isLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.loginService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/admin/account/login']);
    return false;
  }
}
