import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTreeModule,
    AdminRoutingModule,
  ],
  providers: [

  ]
})
export class AdminModule {

}
