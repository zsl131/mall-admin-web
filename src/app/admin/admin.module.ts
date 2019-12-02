import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/auth-interceptor';

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers: [

  ]
})
export class AdminModule {

}
