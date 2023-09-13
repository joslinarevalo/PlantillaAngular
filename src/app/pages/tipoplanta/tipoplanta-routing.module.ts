import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoplantaComponent } from './pages/tipoplanta/tipoplanta.component';



const routes: Routes = [
  { path: 'listar', component:TipoplantaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoplantaRoutingModule { }
