import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaPlantaRoutingModule } from './consulta-planta-routing.module';
import { DetalleComponent } from './detalle/detalle.component';
import { MostrarComponent } from './mostrar/mostrar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetalleComponent,
    MostrarComponent
  ],
  imports: [
    CommonModule,
    ConsultaPlantaRoutingModule,
    FormsModule
  ]
})
export class ConsultaPlantaModule { }
