import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantaRoutingModule } from './planta-routing.module';
import { FormularioComponent } from './component/formulario/formulario.component';
import { TablaComponent } from './component/tabla/tabla.component';
import { PlantaComponent } from './pages/planta/planta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    FormularioComponent,
    TablaComponent,
    PlantaComponent
  ],
  imports: [
    CommonModule,
    PlantaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule, //PARA LA PAGINACION
    DataTablesModule,
    NgSelectModule
  ]
})
export class PlantaModule { }
