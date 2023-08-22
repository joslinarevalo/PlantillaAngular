import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TratamientoRoutingModule } from './tratamiento-routing.module';
import { MostrarComponent } from './pages/mostrar/mostrar.component';


@NgModule({
  declarations: [
    MostrarComponent
  ],
  imports: [
    CommonModule,
    TratamientoRoutingModule
  ]
})
export class TratamientoModule { }
