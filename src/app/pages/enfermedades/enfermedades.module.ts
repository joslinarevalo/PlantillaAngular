import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnfermedadesRoutingModule } from './enfermedades-routing.module';
import { FormularioComponent } from './component/formulario/formulario.component';
import { TablaComponent } from './component/tabla/tabla.component';
import { EnfermedadComponent } from './pages/enfermedad/enfermedad.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    FormularioComponent,
    TablaComponent,
    EnfermedadComponent
  ],
  imports: [
    CommonModule,
    EnfermedadesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule, //PARA LA PAGINACION
    Ng2SearchPipeModule, //PIPE PARA FILTRAR  
    DataTablesModule
  ]
})
export class EnfermedadesModule { }
