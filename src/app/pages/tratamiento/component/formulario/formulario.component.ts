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
  formulario!: FormGroup;
  tratamiento!:ITratamientoDTOValid;
  imagenMostrar!:any;
  formularioSerealizable= new FormData();
  constructor( private fb: FormBuilder, private serviceTratamiento:TratamientoService, private dm:DomSanitizer) { }

  ngOnInit(): void {
    this.formulario=this.inicializarFormulario();
    console.log(this.formulario);
  }
  cerrarModal(){
    this.ModalService.dismissAll();
  }
  inicializarFormulario(): FormGroup {
    return this.fb.group({
      idTratamiento: [''],
      detallePlanta: [''],
      nombrepesticidaTratamiento: ['', [Validators.required]],
      descripcionTratamiento: ['', [Validators.required, Validators.minLength(10)]],
      aplicacionTratamiento: ['', [Validators.required, Validators.minLength(10)]],
      indicacionesTratamiento: ['', [Validators.required, Validators.minLength(10)]],
      tipoTratamiento: ['', [Validators.required, Validators.minLength(10)]],
      urlTratamiento: ['', [Validators.required]]
    });
  }
  
  guardar() {
       
      this.formulario.controls['detallePlanta'].setValue(1);
      this.tratamiento = {
        detallePlanta: this.formulario.controls['detallePlanta'].value,
        nombrepesticidaTratamiento: this.formulario.controls['nombrepesticidaTratamiento'].value,
        descripcionTratamiento:this.formulario.controls['descripcionTratamiento'].value,
        aplicacionTratamiento:this.formulario.controls['aplicacionTratamiento'].value,
        indicacionesTratamiento:this.formulario.controls['indicacionesTratamiento'].value,
        tipoTratamiento:this.formulario.controls['tipoTratamiento'].value,
        urlTratamiento:this.formulario.controls['urlTratamiento'].value,
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
    
    
  }
  modificar() {
    if (this.formulario_valido()) {
      this.tratamiento = {
        idtratamiento:this.formulario.controls['idtratamiento'].value,
        detallePlanta: this.formulario.controls['detallePlanta'].value,
        nombrepesticidaTratamiento: this.formulario.controls['nombrepesticidaTratamiento'].value,
        descripcionTratamiento:this.formulario.controls['descripcionTratamiento'].value,
        aplicacionTratamiento:this.formulario.controls['aplicacionTratamiento'].value,
        indicacionesTratamiento:this.formulario.controls['indicacionesTratamiento'].value,
        tipoTratamiento:this.formulario.controls['tipoTratamiento'].value,
        urlTratamiento:this.formulario.controls['urlTratamiento'].value,
      };
      console.log(this.tratamiento);
      this.serviceTratamiento
        .ModificarTratamiento(this.tratamiento)
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
    if (this.formulario.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.formulario.controls).forEach((control) =>
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
  
}
