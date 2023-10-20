import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFamilia } from '../../interfaces/ifamilia';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { FamiliaService } from '../../service/familia.service';

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
  contador: number = 0;
  porcentajeCompletado: number = 0;
  longitudesDeCampos: any = {};
  mensaje: { [key: string]: string } = {};

  constructor(private serviceFamilia:FamiliaService) { }

  ngOnInit(): void {
    this.obtenerLongitudesCampos();
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

  contarCaracteres(idInput:String) {
    const textarea = document.getElementById(""+idInput) as HTMLTextAreaElement;
    let limiteCaracteres = 0;

    if (this.longitudesDeCampos.hasOwnProperty(idInput+"")) {
      limiteCaracteres = this.longitudesDeCampos[idInput+""];
      console.log("si: " +this.longitudesDeCampos)
      console.log(`Campo: ${idInput}, Valor: ${limiteCaracteres}`);
    } else {
      console.log("no: " +this.longitudesDeCampos)
      console.log(`Campo "${idInput}" no encontrado en fieldLengths`);
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
    this.serviceFamilia.longitudCampos().subscribe((lista) => {
      this.longitudesDeCampos = lista;

      console.log(this.longitudesDeCampos);
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
