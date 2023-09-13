import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasPrincipalRoutingModule } from './paginas-principal-routing.module';
import { PagInicioUserComponent } from './pages/pagInicioUser/pagInicioUser.component';

@NgModule({
  declarations: [
PagInicioUserComponent,
  ],
  imports: [
    CommonModule,
    PaginasPrincipalRoutingModule
  ]
})
export class PaginasPrincipalModule { }
