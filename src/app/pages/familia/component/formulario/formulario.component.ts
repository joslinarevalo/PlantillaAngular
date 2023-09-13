import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFamilia } from '../../interfaces/ifamilia';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  @Input()ModalService!:NgbModal;
  @Input()formularioFamilia!:FormGroup;
  @Input()leyenda:string;
  @Output()ObjetoGuardar= new EventEmitter<IFamilia>();
  @Output()ObjetoModificar= new EventEmitter<IFamilia>();
  familia!:IFamilia;

  constructor() { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.ModalService.dismissAll();
  }

  guardar() {
    if (this.formulario_valido()) {
      console.log(this.formularioFamilia);
      this.familia = {
        nombreFamilia: this.formularioFamilia.controls['nombreFamilia'].value,
      };
      console.log(this.familia);
      this.ObjetoGuardar.emit(this.familia)
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
        this.familia = {
          idfamilia:this.formularioFamilia.controls['idfamilia'].value,
          nombreFamilia:this.formularioFamilia.controls['nombreFamilia'].value
        };
        console.log(this.familia);
        this.ObjetoModificar.emit(this.familia);
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
    const validarCampo = this.formularioFamilia.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid'
      : validarCampo?.touched
      ? 'is-valid'
      : '';
  }

  formulario_valido(): boolean {
    let estado: boolean = false;
    if (this.formularioFamilia.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.formularioFamilia.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    return estado;
  }

}
