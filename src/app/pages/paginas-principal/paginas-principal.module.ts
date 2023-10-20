import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasPrincipalRoutingModule } from './paginas-principal-routing.module';
import { PagInicioUserComponent } from './pages/pagInicioUser/pagInicioUser.component';
import { FormsModule } from '@angular/forms';
import { CardPlantaComponent } from '../consulta-planta/cardPlanta/cardPlanta.component';
import { CardTratamientoComponent } from './pages/cardTratamiento/cardTratamiento.component';
import { DetalleTraCardComponent } from './pages/DetalleTraCard/DetalleTraCard.component';
import { AcercadeComponent } from './pages/Acercade/Acercade.component';

@NgModule({
  declarations: [
PagInicioUserComponent,
CardPlantaComponent,
CardTratamientoComponent,
DetalleTraCardComponent,
AcercadeComponent
  ],
  imports: [
    CommonModule,
    PaginasPrincipalRoutingModule,
    FormsModule

  ]
})
export class PaginasPrincipalModule { }
