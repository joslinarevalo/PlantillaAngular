import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamiliaComponent } from './pages/familia/familia.component';

const routes: Routes = [
  { path: 'listar', component:FamiliaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliaRoutingModule { }
