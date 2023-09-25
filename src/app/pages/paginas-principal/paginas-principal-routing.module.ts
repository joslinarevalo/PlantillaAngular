import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagInicioUserComponent } from './pages/pagInicioUser/pagInicioUser.component';
import { CardsComponent } from '../consulta-tratamiento/component/cards/cards.component';


const routes: Routes = [
  {
    path: 'principal',
    component: PagInicioUserComponent
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasPrincipalRoutingModule { }
