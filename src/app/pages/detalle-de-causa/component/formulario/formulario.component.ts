import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDetalleCausaDTOValid, IEnfermedad, IPlanta, ITipoCausa } from '../../interface/detalleCausa.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { DetalleCausaService } from '../../services/detalle-causa.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  @Input() ModalService!:NgbModal;
  detalleCausa!:IDetalleCausaDTOValid;
  listEnfermedad:IEnfermedad[]=[];
  listPlanta:IPlanta[]=[];
  listCausa:ITipoCausa[]=[];
  @Input()formularioDetalleCausa!:FormGroup;
  imagenMostrar!:any;
  @Output()ObjetoGuardar= new EventEmitter<IDetalleCausaDTOValid>();
  @Output()ObjetoModificar= new EventEmitter<IDetalleCausaDTOValid>();
  @Input()leyenda:string;
  constructor(private fb: FormBuilder, private serviceDetalleCausa:DetalleCausaService) { }

  ngOnInit(): void {
    this.listaEnfermedad();
    this.listaCausa();
    this.listaPlanta();
  }
  cerrarModal(){
    this.ModalService.dismissAll();
  }


  guardar() {
    if (this.formulario_valido()) {
      this. detalleCausa = {
        //idDetalleCausa: this.formularioDetalleCausa.controls['idDetalleCausa'].value,
        idTipo: this.formularioDetalleCausa.controls['idTipo'].value,
        idEnfermedad: this.formularioDetalleCausa.controls['idEnfermedad'].value,
        idPlanta: this.formularioDetalleCausa.controls['idPlanta'].value,
        descripcionCausa: this.formularioDetalleCausa.controls['descripcionCausa'].value,

      };
      this.ObjetoGuardar.emit(this.detalleCausa);
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
      this.detalleCausa = {
        idDetalleCausa: this.formularioDetalleCausa.controls['idDetalleCausa'].value,
        idTipo: this.formularioDetalleCausa.controls['idTipo'].value,
        idEnfermedad: this.formularioDetalleCausa.controls['idEnfermedad'].value,
        idPlanta: this.formularioDetalleCausa.controls['idPlanta'].value,
        descripcionCausa: this.formularioDetalleCausa.controls['descripcionCausa'].value,
      };
      this.ObjetoModificar.emit(this.detalleCausa);
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
    if (this.formularioDetalleCausa.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.formularioDetalleCausa.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    return estado;
  }

  esCampoValido(campo: string) {
    const validarCampo = this.formularioDetalleCausa.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid'
      : validarCampo?.touched
      ? 'is-valid'
      : '';
  }
  listaEnfermedad(){
    this.serviceDetalleCausa.listaEnfermedad().subscribe((resp)=>{
      this.listEnfermedad=resp;
    });
  }
  listaCausa(){
    this.serviceDetalleCausa.listaTipoCausa().subscribe((resp)=>{
      this.listCausa=resp;
      console.log(resp);
    });
  }
  listaPlanta(){
    this.serviceDetalleCausa.listaPlanta().subscribe((resp)=>{
      this.listPlanta=resp;
    })
  }
}
