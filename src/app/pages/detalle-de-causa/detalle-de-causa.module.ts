import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleDeCausaRoutingModule } from './detalle-de-causa-routing.module';
import { FormularioComponent } from './component/formulario/formulario.component';
import { TablaComponent } from './component/tabla/tabla.component';
import { DetalleCausaComponent } from './pages/detalle-causa/detalle-causa.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    FormularioComponent,
    TablaComponent,
    DetalleCausaComponent
  ],
  imports: [
    CommonModule,
    DetalleDeCausaRoutingModule,
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule, //PARA LA PAGINACION
    NgSelectModule
  ]
})
export class DetalleDeCausaModule { }
