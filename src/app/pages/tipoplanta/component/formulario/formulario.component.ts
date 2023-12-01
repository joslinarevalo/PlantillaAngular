import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Itipoplanta } from '../../interfaces/ITipoPlanta';
import { TipoplantaService } from '../../services/tipoplanta.service';


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
  contador: number = 0;
  porcentajeCompletado: number = 0;
  longitudesDeCampos: any = {};
  mensaje: { [key: string]: string } = {};

  constructor(private serviceTipoPlanta:TipoplantaService) { }

  ngOnInit(): void {
    this.obtenerLongitudesCampos();
  }

  cerrarModal(){
    this.ModalService.dismissAll();
  }

  guardar() {
    if (this.formulario_valido()) {
      this.tipoPlanta = {
        tipoPlanta: this.formularioTipoPlanta.controls['tipoPlanta'].value,
      };
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

  contarCaracteres(idInput:String) {
    const textarea = document.getElementById(""+idInput) as HTMLTextAreaElement;
    let limiteCaracteres = 0;

    if (this.longitudesDeCampos.hasOwnProperty(idInput+"")) {
      limiteCaracteres = this.longitudesDeCampos[idInput+""];
    }

    this.contador = textarea.value.length;
    if(this.contador > limiteCaracteres){
      this.contador = textarea.value.length-1;
    }

    if (this.contador >= limiteCaracteres) {
      textarea.value = textarea.value.substring(0, limiteCaracteres);
      this.mensaje[idInput+""] = `Se ha alcanzado el límite de caracteres permitidos`;
    }else{
      this.mensaje[idInput+""] = `${this.contador} caracteres de ${limiteCaracteres} permitidos`;
    }
  }

  obtenerLongitudesCampos() {
    this.serviceTipoPlanta.longitudCampos().subscribe((lista) => {
      this.longitudesDeCampos = lista;
    });
  }

  capitalizeFirstLetter(input: string): string {
    if (input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    } else {
      return input;
    }
  }

}
