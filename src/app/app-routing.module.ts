import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { Page404Component } from './extrapages/page404/page404.component';
import { AutenticacionGuard } from './usuario/guards/autenticacion.guard';
import { RolGuard } from './usuario/guards/rol.guard';

const routes: Routes = [
 { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
 { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a VistaGeneral por defecto
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AutenticacionGuard], data:{rol:'ADMIN'} },
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AutenticacionGuard, RolGuard], data:{rol:'ADMIN'} },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
