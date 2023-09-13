import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Itipoplanta } from '../../interfaces/ITipoPlanta';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  @Input()ModalService!:NgbModal;
  @Input()formularioTipoPlanta!:FormGroup;
  @Input()leyenda:string;
  @Output()ObjetoGuardar= new EventEmitter<Itipoplanta>();
  @Output()ObjetoModificar= new EventEmitter<Itipoplanta>();
  tipoPlanta!:Itipoplanta;

  constructor() { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.ModalService.dismissAll();
  }

  guardar() {
    if (this.formulario_valido()) {
      console.log(this.formularioTipoPlanta);
      this.tipoPlanta = {
        tipoPlanta: this.formularioTipoPlanta.controls['tipoPlanta'].value,
      };
      console.log(this.tipoPlanta);
      this.ObjetoGuardar.emit(this.tipoPlanta)
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
        this.tipoPlanta = {
          idTipoPlanta:this.formularioTipoPlanta.controls['idTipoPlanta'].value,
          tipoPlanta:this.formularioTipoPlanta.controls['tipoPlanta'].value
        };
        console.log(this.tipoPlanta);
        this.ObjetoModificar.emit(this.tipoPlanta);
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

  esCampoValido(campo: string) {
    const validarCampo = this.formularioTipoPlanta.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid'
      : validarCampo?.touched
      ? 'is-valid'
      : '';
  }

  formulario_valido(): boolean {
    let estado: boolean = false;
    if (this.formularioTipoPlanta.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.formularioTipoPlanta.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    return estado;
  }

}
