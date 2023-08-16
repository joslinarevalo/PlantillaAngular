import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SintomaRoutingModule } from './sintoma-routing.module';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { TablaComponent } from './pages/tabla/tabla.component';


@NgModule({
  declarations: [
    BuscarComponent,
    MostrarComponent,
    NuevoComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    SintomaRoutingModule
  ]
})
export class SintomaModule { }
