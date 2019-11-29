import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InitialComponent } from './initial/initial.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'initial', component: InitialComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {

}
