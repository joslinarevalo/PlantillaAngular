import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaEnfermedadRoutingModule } from './consulta-enfermedad-routing.module';
import { DetalleComponent } from './detalle/detalle.component';
import { MostrarComponent } from './mostrar/mostrar.component';


@NgModule({
  declarations: [
    DetalleComponent,
    MostrarComponent
  ],
  imports: [
    CommonModule,
    ConsultaEnfermedadRoutingModule
  ]
})
export class ConsultaEnfermedadModule { }
