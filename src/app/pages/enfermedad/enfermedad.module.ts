import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnfermedadRoutingModule } from './enfermedad-routing.module';
import { TablaComponent } from './pages/tabla/tabla.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';


@NgModule({
  declarations: [
    TablaComponent,
    NuevoComponent,
    MostrarComponent,
    BuscarComponent
  ],
  imports: [
    CommonModule,
    EnfermedadRoutingModule
  ]
})
export class EnfermedadModule { }
