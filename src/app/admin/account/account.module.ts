import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { InitialComponent } from './initial/initial.component';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [
    InitialComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ],
  providers: [

  ]
})
export class AccountModule {

}
