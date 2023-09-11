import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatogenosRoutingModule } from './patogenos-routing.module';
import { MostrarComponent } from './mostrar/mostrar.component';


@NgModule({
  declarations: [
    MostrarComponent
  ],
  imports: [
    CommonModule,
    PatogenosRoutingModule
  ]
})
export class PatogenosModule { }
