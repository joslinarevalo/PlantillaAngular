import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioCRoutingModule } from './usuario-c-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { FormularioUserComponent } from './componente/formularioUser/formularioUser.component';
import { TablaUserComponent } from './componente/tablaUser/tablaUser.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [FormularioUserComponent,UsuarioComponent,TablaUserComponent],
  imports: [
    CommonModule,
    UsuarioCRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule, //PARA LA PAGINACION
    DataTablesModule,
    NgSelectModule
  ]
})
export class UsuarioCModule { }
