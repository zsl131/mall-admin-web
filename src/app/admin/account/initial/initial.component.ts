import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SystemConfigService } from '../../service/system-config.service';

/**
 * 后台初始化组件
 * @author silent
 */
@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent {
  loading: boolean = false;
  hide = true;
  initForm = new FormGroup({
    appName: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    nickname: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  constructor(private systemConfigService: SystemConfigService) {

  }

  onSubmit() {
    this.loading = true;
    this.systemConfigService.initSystem(this.initForm.value).subscribe(res => {
      this.loading = false;
      console.log(res);
    }, error => {
      this.loading = false;
    });
  }
}
