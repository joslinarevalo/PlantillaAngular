import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AutenticacionService } from "../services/autenticacion.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class RolGuard implements CanActivate {
  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let role = route.data["rol"] as string; //ver como paso esto a una cadena de string
    let rol = [role];
    if (this.autenticacionService.tieneRol(rol)) {
      return true;
    }
    this.router.navigate(["/paginas-principal/principal"]);
    //  Swal.fire('Acceso denegado',`Hola ${this.autenticacionService.usuario.usuario} ¡no tienes acceso a este recurso!`,'warning');
    Swal.fire({
      title: "Acceso denegado",
      text: `Hola ${this.autenticacionService.usuario.usuario} ¡no tienes acceso a este recurso!`,
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#146C43",
    });
    return false;
  }
}
