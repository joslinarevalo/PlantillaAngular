import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/usuario/models/Usuario';

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
  usuarioList:Usuario[]=[];
  @Input()formularioUsuario!:FormGroup;
  leyenda:string="";
  constructor(public modalService:NgbModal, private fb: FormBuilder) { }

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
     
    });
  }
  listaUsuario(){}
  EliminarUsuario(){}
  modifcarUsuarioFormulario(){}
  modificarUsuario(){}
  guardarUsuario(){}

}
