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

  constructor(
    private autenticacionSevice: AutenticacionService,
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
    if(this.autenticacionSevice.isAuthenticated()){
      console.log("No habian datos")
      Swal.fire('Login', `${this.autenticacionSevice.usuario.usuario} ya estás autenticado!`,'info');
      
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if(this.usuario.usuario == null || this.usuario.clave == null){
      Swal.fire('Error Login', 'Usuario o clave vacias!', 'error');
      return;
    }

    this.autenticacionSevice.login(this.usuario).subscribe(response =>{
      console.log(response);
      console.log("--------------------------")
      //let payload = JSON.parse(atob(response.token.split(".")[1]));
      console.log(JSON.parse(atob(response.token.split(".")[1])));

     this.autenticacionSevice.guardarUsuario(response.token);
      this.autenticacionSevice.guardarToken(response.token);
      /* let admin = 'ROLE_ADMIN';
      let estudiante = "ROLE_USER";
      let rol = [estudiante,admin]
      this.autenticacionSevice.tieneRol(rol); */

      let user = this.autenticacionSevice.usuario;

      /* Swal.fire('Error Login', 'rol: '+rol, 'error');
      Swal.fire('Error Login', 'Usuario !'+this.autenticacionSevice.tieneRol(rol), 'error');
 */
      this.router.navigate(['/dashboard']);
      Swal.fire('Login',`hola ${user.usuario}, Has iniciado sesión con éxito!`,'success');
    }, error => {
      Swal.fire('Error Login', 'Usuario o contraseña son incorrectas!', 'error');
    }
      /* (response:any)=>{
        this.router.navigate(['/dashboard']);
        console.log(response); 
        Swal.fire('Login',`hola ${response.Message}, Has iniciado sesión con éxito!`,'success');
        
      },(error) =>{
       //this.router.navigate(['/dashboard']);
       Swal.fire('Login',`hola ${error},NO Has iniciado sesión con éxito!`,'error');
      } */
    )
  }
  

}
