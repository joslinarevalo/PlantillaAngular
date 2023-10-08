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
      Swal.fire('Login', `${this.autenticacionService.usuario.usuario} ya estás autenticado!`,'info');
      
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

      /* Swal.fire('Error Login', 'rol: '+rol, 'error');
      Swal.fire('Error Login', 'Usuario !'+this.autenticacionSevice.tieneRol(rol), 'error');
 */

      /* if (this.usuario.roles.includes(roles[i])) {
        return true; // Si encuentra al menos un rol coincidente, devuelve true
      } */
      if(this.autenticacionService.tieneRol(rol)){
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/paginas-principal/principal']);
      }
      
      Swal.fire('Inicio de sesión',`Hola ${user.usuario}, Has iniciado sesión con éxito!`,'success');
    }, error => {
      Swal.fire('Error al iniciar sesión', 'Usuario o contraseña son incorrectas!', 'error');
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
  
  mostrarPassword(){
    if(this.tipo=="password") {
      this.tipo="text" ;
      } else{
      this.tipo="password" 
      }
  }
}
