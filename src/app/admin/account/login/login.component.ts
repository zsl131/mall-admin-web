import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

/**
 * 后台登录组件
 * @author silent
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;
  hide = true;
  errMsg: string;

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  constructor(private loginService: LoginService, private router: Router) {

  }

  onSubmit() {
    this.loading = true;
    this.loginService.login(this.loginForm.value).subscribe(data => {
      this.loading = false;
      if(data.message) {
        this.errMsg = data.message;
      } else {
        localStorage.setItem('auth-token', data.obj.token);
        this.router.navigate(['/admin']);
      }
    }, error => {
      this.loading = false;
    });
  }

}
