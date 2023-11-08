import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../services/autenticacion.service';
import { MyObj } from '../interfaces/MyObj';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Declaracion de un FormGroup
  usuario: Usuario;
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
    console.log(this.usuario);
    if(this.usuario.usuario == null || this.usuario.clave == null){
      Swal.fire('Error Login', 'Usuario o clave vacias!', 'error');
      return;
    }
    this.autenticacionService.login(this.usuario).subscribe(response =>{
      console.log(response);
      console.log("--------------------------")
      //let payload = JSON.parse(atob(response.token.split(".")[1]));
      console.log(JSON.parse(atob(response.token.split(".")[1])));
     this.autenticacionService.guardarUsuario(response.token);
      this.autenticacionService.guardarToken(response.token);
      let admin = "ROLE_ADMIN";
      //let estudiante = "ROLE_USER";
      let rol = [admin]
      /*this.autenticacionSevice.tieneRol(rol); */
      let user = this.autenticacionService.usuario;
    
      if(this.autenticacionService.tieneRol(rol)){
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/paginas-principal/principal']);
      }
      Swal.fire({
        title: "Inicio de sesión",
        text: `Hola ${user.usuario}, Has iniciado sesión con éxito!`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#146C43",
      });
 
    }, error => {
   Swal.fire({
    title: "Error al iniciar sesión",
    text: `Usuario o contraseña son incorrectas!`,
    icon: "error",
    confirmButtonText: "OK",
    confirmButtonColor: "#146C43",
  });
    }
    )
  }
  
  mostrarPassword(){
    if(this.tipo=="password") {
      this.tipo="text" ;
      } else{
      this.tipo="password" 
      }
  }
}
