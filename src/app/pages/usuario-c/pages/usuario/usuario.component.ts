import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { IUsuarioMostrar, IUsuarioValid } from '../../interface/usuario.interface';
import { UsuarioServiceService } from '../../service/usuario-service.service';
import { mensajeError, mensajeExito } from 'src/app/pages/models/funciones.global';
import Swal from 'sweetalert2';
import { NAME_VALIDATE } from 'src/app/constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  modalOptions: NgbModalOptions = {
    ariaLabelledBy: 'modal-basic-title',
    size: 'lg', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop:'static'
  };
  usuarioList:IUsuarioMostrar[]=[];
  formularioUsuario!:FormGroup;
  leyenda:string="";
  constructor(public modalService:NgbModal, private fb: FormBuilder,private usuarioService:UsuarioServiceService,private router: Router,) { }

  ngOnInit() {
    this.listaUsuario();
    this.formularioUsuario=this.inicializarFormulario();

  }
  openModal(content: any) {
    this.leyenda="Registrar";
    this.formularioUsuario.reset();
    this.modalService.open(content, this.modalOptions);

  }
  inicializarFormulario(): FormGroup {
    return this.fb.group({
      id: [''],
      nombre: ['', [Validators.required,Validators.pattern(NAME_VALIDATE)]],
      apellido: ['', [Validators.required,Validators.pattern(NAME_VALIDATE)]],
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]],
      correo: ['', [Validators.required,Validators.email]],
      estado: ['', [Validators.required]],
      idrol: ['', [Validators.required]],
    });
  }
  EliminarUsuario(objetoEliminar:IUsuarioMostrar){
    console.log(objetoEliminar);
    
    const alert = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    alert
      .fire({
        title: '¿Estas Seguro?',
        text: `¡No podras revertir esto!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
        
          this.usuarioService.eliminarUsuario(objetoEliminar).subscribe((resp)=>{
            alert.fire('Eliminado', 'El Usuario ha sido eliminado', 'success'); 
            this.recargar();
          });
         
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire('Canselado', 'El Usuario no se elimino', 'error');
        }
      });
  }
  listaUsuario(){
    this.usuarioService.listaDeUsuarios().subscribe((resp)=>{
      console.log(resp);
      this.usuarioList=resp;
      
    })
  }
  modificarUsuarioFormulario(objetoModificar:IUsuarioMostrar,content:any){
    console.log(objetoModificar);
    this.formularioUsuario.patchValue(objetoModificar);
    this.formularioUsuario.controls['clave'].setValue("");
    this.formularioUsuario.get('clave').setValidators([]);
    this.formularioUsuario.get('clave').updateValueAndValidity();
    this.leyenda="Modificar";
    this.modalService.open(content,this.modalOptions);
  }
  modificarUsuario(usuarioModificar:IUsuarioValid){
    this.usuarioService
    .modificarUsuario(usuarioModificar)
    .subscribe({
      next:(resp)=>{
        mensajeExito("Usuario modificado con exito");
      },
      error:(err)=>{
        mensajeError("Error al modificar el Usuario");
      },
      complete:()=>{
      this.modalService.dismissAll();
      this.formularioUsuario.reset();
      this.recargar();
      }
    });
  }
  guardarUsuario(usuarioGuardar:IUsuarioValid){
    this.usuarioService
    .guardarUsuario(usuarioGuardar)
    .subscribe({
      next:(resp)=>{
        mensajeExito("Usuario guardado con exito");
      },
      error:(err)=>{
        mensajeError("Error al guardar el Usuario");
      },
      complete:()=>{
      this.modalService.dismissAll();
      this.formularioUsuario.reset();
      this.recargar();
      }
    });
  }
  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
 

}
