import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasPrincipalRoutingModule } from './paginas-principal-routing.module';
import { PagInicioUserComponent } from './pages/pagInicioUser/pagInicioUser.component';
import { FormsModule } from '@angular/forms';
import { CardPlantaComponent } from '../consulta-planta/cardPlanta/cardPlanta.component';
import { CardTratamientoComponent } from './pages/cardTratamiento/cardTratamiento.component';

@NgModule({
  declarations: [
PagInicioUserComponent,
CardPlantaComponent,
CardTratamientoComponent
  ],
  imports: [
    CommonModule,
    PaginasPrincipalRoutingModule,
    FormsModule

  ]
})
export class PaginasPrincipalModule { }
