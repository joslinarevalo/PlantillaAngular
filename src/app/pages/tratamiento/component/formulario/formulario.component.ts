import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITratamientoDTOValid } from '../../interface/tratamiento.interface';
import { TratamientoService } from '../../service/service.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  //recibe un parametro del padre
  @Input() ModalService!:NgbModal;
  tratamiento!:ITratamientoDTOValid; 
  formularioTratamiento!:FormGroup;
  imagenMostrar!:any;
  formularioSerealizable= new FormData();
  constructor( private fb: FormBuilder, private serviceTratamiento:TratamientoService, private dm:DomSanitizer) { }

  ngOnInit(): void {
    this.formularioTratamiento=this.inicializarFormulario();
    //console.log(this.formularioTratamiento);
  }
  cerrarModal(){
    this.ModalService.dismissAll();
  }
  inicializarFormulario(): FormGroup {
    return this.fb.group({
      idTratamiento: [''],
      detallePlanta: [''],
      nombrePesticidaTratamiento: ['', [Validators.required]],
      descripcionTratamiento: ['', [Validators.required]],
      aplicacionTratamiento: ['', [Validators.required]],
      indicacionesTratamiento: ['', [Validators.required]],
      tipoTratamiento: ['', [Validators.required]],
      urlTratamiento: ['', [Validators.required]]
    });
  }
  
  guardar() {
    if (this.formulario_valido()) {
      console.log(this.formularioTratamiento); 
      this.formularioTratamiento.controls['detallePlanta'].setValue(1);
      this.tratamiento = {
        detallePlanta: this.formularioTratamiento.controls['detallePlanta'].value,
        nombrePesticidaTratamiento: this.formularioTratamiento.controls['nombrePesticidaTratamiento'].value,
        descripcionTratamiento:this.formularioTratamiento.controls['descripcionTratamiento'].value,
        aplicacionTratamiento:this.formularioTratamiento.controls['aplicacionTratamiento'].value,
        indicacionesTratamiento:this.formularioTratamiento.controls['indicacionesTratamiento'].value,
        tipoTratamiento:this.formularioTratamiento.controls['tipoTratamiento'].value,
        urlTratamiento:this.formularioTratamiento.controls['urlTratamiento'].value,
      };
      //this.presentacion=this.formulario.value;
      console.log(this.tratamiento);
      this.formularioSerealizable.set("tratamiento",JSON.stringify(this.tratamiento));
      this.serviceTratamiento
        .GuardarTratamiento(this.formularioSerealizable)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Exito',
            showConfirmButton: false,
            timer: 1500,
          });
          
        });
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
      this.tratamiento = {
        idTratamiento:this.formularioTratamiento.controls['idtratamiento'].value,
        detallePlanta: this.formularioTratamiento.controls['detallePlanta'].value,
        nombrePesticidaTratamiento: this.formularioTratamiento.controls['nombrePesticidaTratamiento'].value,
        descripcionTratamiento:this.formularioTratamiento.controls['descripcionTratamiento'].value,
        aplicacionTratamiento:this.formularioTratamiento.controls['aplicacionTratamiento'].value,
        indicacionesTratamiento:this.formularioTratamiento.controls['indicacionesTratamiento'].value,
        tipoTratamiento:this.formularioTratamiento.controls['tipoTratamiento'].value,
        urlTratamiento:this.formularioTratamiento.controls['urlTratamiento'].value,
      };
      console.log(this.tratamiento);
      this.formularioSerealizable.set("tratamiento",JSON.stringify(this.tratamiento));
      this.serviceTratamiento
        .ModificarTratamiento(this.formularioSerealizable)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Exito',
            showConfirmButton: false,
            timer: 1500,
          });
          this.cerrarModal();
        });
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
    if (this.formularioTratamiento.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.formularioTratamiento.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    return estado;
  }
  SeleccionarImagen(event:any){
    let lector=new FileReader();
    lector.readAsDataURL(event.target.files[0]);
    lector.onload=()=>{this.imagenMostrar=lector.result;}
    let file:File=event.target.files[0];
    this.formularioSerealizable.set("imagen",file);
  }
  esCampoValido(campo: string) {
    const validarCampo = this.formularioTratamiento.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid'
      : validarCampo?.touched
      ? 'is-valid'
      : '';
  }
  
}
