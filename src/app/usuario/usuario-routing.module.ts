import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrousuarioComponent } from './Registrousuario/Registrousuario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
 {path: 'registro',component: RegistrousuarioComponent} ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
