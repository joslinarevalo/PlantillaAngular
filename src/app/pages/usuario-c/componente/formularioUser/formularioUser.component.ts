import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IRoles, IUsuarioValid } from '../../interface/usuario.interface';
import Swal from 'sweetalert2';
import { UsuarioServiceService } from '../../service/usuario-service.service';
@Component({
  selector: 'app-formularioUser',
  templateUrl: './formularioUser.component.html',
  styleUrls: ['./formularioUser.component.scss']
})
export class FormularioUserComponent implements OnInit {
  @Input() ModalService!:NgbModal;
  usuarios:IUsuarioValid;
  roList:IRoles[]=[];
  tipo:string="password";
  @Input()formularioUsuario!:FormGroup;
  @Output()ObjetoGuardar= new EventEmitter<IUsuarioValid>();
  @Output()ObjetoModificar= new EventEmitter<IUsuarioValid>();
  @Input()leyenda:string;
  constructor(private fb: FormBuilder,private userService:UsuarioServiceService) { }

  ngOnInit() {
    this.listaRol();
  }
  cerrarModal(){
    this.ModalService.dismissAll();
  }
  guardar(){
    if (this.formulario_valido()) {
      this.usuarios = {
        nombre: this.formularioUsuario.controls['nombre'].value,
        apellido:this.formularioUsuario.controls['apellido'].value,
        correo:this.formularioUsuario.controls['correo'].value,
        estado:this.formularioUsuario.controls['estado'].value,
        usuario:this.formularioUsuario.controls['usuario'].value,
        clave:this.formularioUsuario.controls['clave'].value,
        idrol: this.formularioUsuario.controls['idrol'].value
      };

      this.ObjetoGuardar.emit(this.usuarios);
      }else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'error en el formulario',
          showConfirmButton: false,
          timer: 1500,
        });
  }
  }
  modificar() {
    if (this.formulario_valido()) {
      this.usuarios = {
        id:this.formularioUsuario.controls['id'].value,
        nombre: this.formularioUsuario.controls['nombre'].value,
        apellido:this.formularioUsuario.controls['apellido'].value,
        correo:this.formularioUsuario.controls['correo'].value,
        estado:this.formularioUsuario.controls['estado'].value,
        usuario:this.formularioUsuario.controls['usuario'].value,
        clave:this.formularioUsuario.controls['clave'].value,
        idrol: this.formularioUsuario.controls['idrol'].value
      };
      this.ObjetoModificar.emit(this.usuarios);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'error en el formulario',
        showConfirmButton: false,
        timer: 1500,
      });
  }
}
  formulario_valido(): boolean {
    let estado: boolean = false;
    if (this.formularioUsuario.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.formularioUsuario.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    return estado;
  }
  esCampoValido(campo: string) {
    const validarCampo = this.formularioUsuario.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid'
      : validarCampo?.touched
      ? 'is-valid'
      : '';
  }
  listaRol(){
    this.userService.listaDeRoles().subscribe((resp)=>{
      this.roList=resp;
    })
  }
  mostrarPassword(){
    if(this.tipo=="password") {
      this.tipo="text" ;
      } else{
      this.tipo="password"
      }
  }

  autoCompletarUsuario(email: String){
    const user = email.split('@');
    if(user.length>1){
      this.formularioUsuario.get('usuario')?.setValue(user[0]);
    }
  }

}
