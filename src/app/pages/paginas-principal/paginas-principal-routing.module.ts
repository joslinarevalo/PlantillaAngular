import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagInicioUserComponent } from './pages/pagInicioUser/pagInicioUser.component';
import { CardsComponent } from '../consulta-tratamiento/component/cards/cards.component';
import { AcercadeComponent } from './pages/Acercade/Acercade.component';


const routes: Routes = [
  {
    path: 'principal',
    component: PagInicioUserComponent
},
{
  path: 'acercade',
  component: AcercadeComponent  // Usa el componente Acercade para la ruta /acercade
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasPrincipalRoutingModule { }
