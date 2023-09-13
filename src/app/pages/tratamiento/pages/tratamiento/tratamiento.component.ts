import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ITratamientoDTOValid, ITratamientoMostrar } from '../../interface/tratamiento.interface';
import { TratamientoService } from '../../service/service.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mensajeError, mensajeExito } from 'src/app/pages/models/funciones.global';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.scss']
})
export class TratamientoComponent implements OnInit {
  modalOptions: NgbModalOptions = {
    ariaLabelledBy: 'modal-basic-title',
    size: 'lg', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop:'static'
  };
  tratamientoList:ITratamientoMostrar[]=[];
  imagen:any;
  formularioTratamiento!:FormGroup;
  leyenda:string="";
  archivo:File;
  constructor(public modalService:NgbModal,private serviceTratamiento:TratamientoService,
    private dm:DomSanitizer, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listaTratamiento();
    this.formularioTratamiento=this.inicializarFormulario();
  }
  openModal(content: any) {
    this.leyenda="Registrar";
    this.formularioTratamiento.reset();
    this.modalService.open(content, this.modalOptions);

  }
  inicializarFormulario(): FormGroup {
    return this.fb.group({
      idTratamiento: [''],
      nombrePesticidaTratamiento: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(250)]],
      descripcionTratamiento: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(250)]],
      aplicacionTratamiento: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(250)]],
      indicacionesTratamiento: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(250)]],
      tipoTratamiento: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      urlTratamiento: ['', [Validators.required,,Validators.minLength(10),Validators.maxLength(200)]]
    });
  }
  listaTratamiento(){
    this.serviceTratamiento.listaDeTratamiento().subscribe((resp)=>{
      this.tratamientoList=resp;
      console.log(resp);
      this.tratamientoList.forEach(element => {
        this.serviceTratamiento.getImagen(element.urlTratamiento).subscribe((resp)=>{
          //console.log(resp);
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          //console.log(this.imagen);
          element.imagen=this.imagen;
          element.archivo=this.convertirArchivo(resp,element.urlTratamiento);
          console.log(element.archivo);
        });
      });

    })
  }
  eliminarTratamiento(objetoEliminar:ITratamientoMostrar){
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

          this.serviceTratamiento.eliminarTratamiento(objetoEliminar).subscribe((resp)=>{
            alert.fire('Eliminado', 'El registro ha sido eliminado', 'success');
            this.listaTratamiento();
          });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire('Canselado', 'El registro no se elimino', 'error');
        }
      });
  }
  modificarTratamientoFormulario(tratamientoModificar:FormData){

    this.serviceTratamiento
        .modificarTratamiento(tratamientoModificar)
        .subscribe({
          next:(resp)=>{
            console.log(resp);
            mensajeExito("Tratamiento modificado con exito");
          },
          error:(err)=>{
            mensajeError("Error al modificar el tratamiento");
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioTratamiento.reset();
          this.listaTratamiento();
          }
        });

  }
  modificarTratamiento(objetoModificar:ITratamientoMostrar,content:any){
    this.formularioTratamiento.get('urlTratamiento').setValidators([]);
    this.formularioTratamiento.get('urlTratamiento').updateValueAndValidity();
    this.imagen=objetoModificar.imagen;
    this.formularioTratamiento.patchValue(objetoModificar);
    this.leyenda="Modificar";
    this.archivo=objetoModificar.archivo;
     this.modalService.open(content, this.modalOptions);
  }
  guardarTratamiento(tratamientoGuardar:FormData){
    this.serviceTratamiento
        .guardarTratamiento(tratamientoGuardar)
        .subscribe({
          next:(resp)=>{
            console.log(resp);
            mensajeExito("Tratamiento guardado con exito");
          },
          error:(err)=>{
            console.log(err);
            mensajeError("Error al guardar el tratamiento: "+err);
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioTratamiento.reset();
          this.listaTratamiento();
          }
        });

  }
  convertirArchivo(blob: Blob | undefined, url:string): File {
    let miArchivo!: File;
    let nombre=url.substring(36);
    console.log("nombre del archivo a modificar: "+nombre);
    if (blob != undefined) {
      miArchivo = new File([blob], nombre, {
        type: blob.type,
      });
      return miArchivo;
    } else {
      return miArchivo;
    }
  }

}
