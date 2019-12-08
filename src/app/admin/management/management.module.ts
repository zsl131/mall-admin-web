import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';

/**
 * 后台管理模块
 * @author silent
 */
@NgModule({
  declarations: [
    UserComponent,
    RoleComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
  ],
  providers: []
})
export class ManagementModule {

}
