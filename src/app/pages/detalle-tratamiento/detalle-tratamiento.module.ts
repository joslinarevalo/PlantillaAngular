import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { DetalleTratamientoRoutingModule } from './detalle-tratamiento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleTratamientoComponent } from './pages/detalle-tratamiento/detalle-tratamiento.component';
import { TablaComponent } from './component/tabla/tabla.component';
import { FormularioComponent } from './component/formulario/formulario.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    TablaComponent,
    FormularioComponent,
    DetalleTratamientoComponent
  ],
  imports: [
    CommonModule,
    DetalleTratamientoRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule, //PARA LA PAGINACION
    NgSelectModule
  ]
})
export class DetalleTratamientoModule { }
