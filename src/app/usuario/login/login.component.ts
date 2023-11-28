import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../services/autenticacion.service';
import { MyObj } from '../interfaces/MyObj';
import { IUsuarioCorreo } from 'src/app/pages/usuario-c/interface/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Declaracion de un FormGroup
  usuario: Usuario;
  user: IUsuarioCorreo;
  tipo:string="password";
  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
      this.loginForm = this.formBuilder.group({
        usuario: ['', [Validators.required]], // Define los controles y las validaciones
        clave: ['', Validators.required]
      });
    this.usuario = new Usuario();
   }

   ngOnInit(): void {
    if(this.autenticacionService.isAuthenticated()){
      console.log("No habian datos")
      Swal.fire({
        title: "Login",
        text: `${this.autenticacionService.usuario.usuario} ya estás autenticado!`,
        icon: "info",
        confirmButtonText: "OK",
        confirmButtonColor: "#146C43",
      });
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    if(this.usuario.usuario == null || this.usuario.clave == null){
      Swal.fire({
        title: "Error Login",
        text: `¡Usuario o clave vacias!`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#146C43",
      });
      return;
    }

    this.user = {
      id: "string",
      apellido: "string",
      correo: this.usuario.usuario,
      clave: "string",
      usuario: this.usuario.usuario,
      estado: "string",
      nombre: "string",
      idrol: 0,
      claveTemporal: "",
      horaExpiracion: "",
    };


    this.autenticacionService.buscarUser(this.user).subscribe(response => {
      console.log(response);
      let obj = JSON.parse(response.mensaje);
      if (obj.estado != "ACTIVO") {
        Swal.fire({
          title: 'Error de Permiso',
          text: '¡Lo siento, no tienes los privilegios necesarios para acceder al sistema!',
          icon: 'error',
          confirmButtonColor: '#146C43'
        });

        return;
      } else {


        this.autenticacionService.login(this.usuario).subscribe(response => {

          this.autenticacionService.guardarUsuario(response.token);
          this.autenticacionService.guardarToken(response.token);
          let admin = "ROLE_ADMIN";

          let rol = [admin]


          let user = this.autenticacionService.usuario;


          if (this.autenticacionService.tieneRol(rol)) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/paginas-principal/principal']);
          }

          Swal.fire({
            title: "Inicio de sesión",
            text: `Hola ${user.usuario}, ¡Has iniciado sesión con éxito!`,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#146C43",
          });

        }, error => {
          Swal.fire({
            title: "Error al iniciar sesión",
            text: `¡Usuario o contraseña son incorrectas!`,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#146C43",
          });
        }
        )
      }
    });
  }

  mostrarPassword(){
    if(this.tipo=="password") {
      this.tipo="text" ;
      } else{
      this.tipo="password"
      }
  }
}
