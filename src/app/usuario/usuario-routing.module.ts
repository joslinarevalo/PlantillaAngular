import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";

const routes: Routes = [
  {  path: "login", component: LoginComponent },
  {  path: "password-reset", component: PasswordResetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
