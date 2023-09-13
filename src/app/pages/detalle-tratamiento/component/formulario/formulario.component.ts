import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDetalleCausaDTO, IDetalleTratamientoDTOMostrar, IDetalleTratamientoDTOValid } from '../../interface/detalleTratamiento.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleTratamientoService } from '../../service/detalle-tratamiento.service';
import Swal from 'sweetalert2';
import { TratamientoService } from 'src/app/pages/tratamiento/service/service.service';
import { ITratamientoMostrar } from 'src/app/pages/tratamiento/interface/tratamiento.interface';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  @Input() ModalService!:NgbModal;
  detalleTratamiento!:IDetalleTratamientoDTOValid;
  listDetalleCausa:IDetalleCausaDTO[]=[];
  listTratamiento:ITratamientoMostrar[]=[];
  @Input()formularioDetalleTratamiento!:FormGroup;
  imagenMostrar!:any;
  @Output()ObjetoGuardar= new EventEmitter<IDetalleTratamientoDTOValid>();
  @Output()ObjetoModificar= new EventEmitter<IDetalleTratamientoDTOValid>();
  @Input()leyenda:string;
  constructor(private fb: FormBuilder, private serviceDetalleTratamiento:DetalleTratamientoService, private serviceTratamiento:TratamientoService) { }

  ngOnInit(): void {
    this.listaDetalleCausa();
    this.listaTratamiento();
  }
  cerrarModal(){
    this.ModalService.dismissAll();
  }


  guardar() {
    if (this.formulario_valido()) {
      console.log(this.formularioDetalleTratamiento);
      this. detalleTratamiento = {
        idDetalleCausa: this.formularioDetalleTratamiento.controls['idDetalleCausa'].value,
        idTratamiento: this.formularioDetalleTratamiento.controls['idTratamiento'].value

      };
      //this.presentacion=this.formulario.value;
      console.log(this.detalleTratamiento);
      this.ObjetoGuardar.emit(this.detalleTratamiento);
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
      //console.log(this.formularioDetalleTratamiento);
      this.detalleTratamiento = {
        idDetalleCausa: this.formularioDetalleTratamiento.controls['idDetalleCausa'].value,
        idTratamiento: this.formularioDetalleTratamiento.controls['idTratamiento'].value,
        idDetalleTratamiento:this.formularioDetalleTratamiento.controls['idDetalleTratamiento'].value
      };
      console.log(this.detalleTratamiento);
      this.ObjetoModificar.emit(this.detalleTratamiento);
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
    if (this.formularioDetalleTratamiento.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.formularioDetalleTratamiento.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    return estado;
  }

  esCampoValido(campo: string) {
    const validarCampo = this.formularioDetalleTratamiento.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid'
      : validarCampo?.touched
      ? 'is-valid'
      : '';
  }
  listaDetalleCausa(){
    this.serviceDetalleTratamiento.listaDetalleCausa().subscribe((resp)=>{
      this.listDetalleCausa=resp;
      console.log(resp);
    });
  }
  listaTratamiento(){
    this.serviceTratamiento.listaDeTratamiento().subscribe((resp)=>{
      this.listTratamiento=resp;
      console.log(resp);
    })
  }

}
