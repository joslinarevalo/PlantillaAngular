import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { IEnfermedadMostrar } from '../../interfaces/IEnfermedad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnfermedadService } from '../../service/enfermedad.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { mensajeError, mensajeExito } from '../../models/funciones.global';

@Component({
  selector: 'app-enfermedad',
  templateUrl: './enfermedad.component.html',
  styleUrls: ['./enfermedad.component.scss']
})
export class EnfermedadComponent implements OnInit {
  modalOptions: NgbModalOptions = {
    ariaLabelledBy: 'modal-basic-title',
    size: 'lg', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop:'static'
  };
  enfermedadList:IEnfermedadMostrar[]=[];
  imagen:any;
  formularioEnfermedad!:FormGroup;
  leyenda:string="";
  archivo:File;
  constructor(public modalService:NgbModal,private serviceEnfermedad:EnfermedadService, 
    private dm:DomSanitizer, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listaEnfermedad();
    this.formularioEnfermedad=this.inicializarFormulario();
  }
  openModal(content: any) {
    this.leyenda="Registrar";
    this.modalService.open(content, this.modalOptions);
  }
  inicializarFormulario(): FormGroup {
    return this.fb.group({
      idEnfermedad: [''],
      nombreComunEnfermedad: [''],
      nombreCientificoEnfermedad: ['', [Validators.required]],
      descripcionEnfermedad: ['', [Validators.required]],
      etapaEnfermedad: ['', [Validators.required]],
      tipoEnfermedad: ['', [Validators.required]],
      sintomasEnfermedad: ['', [Validators.required]],
      condicionFavorableEnfermedad: ['', [Validators.required]],
      partesAfectadasEnfermedad: ['', [Validators.required]],
      urlEnfermedad: ['', [Validators.required]]
    });
  }
  listaEnfermedad(){
    this.serviceEnfermedad.listaEnfermedades().subscribe((resp)=>{
      this.enfermedadList=resp;
      console.log(resp);
      this.enfermedadList.forEach(element => {
        this.serviceEnfermedad.getImagen(element.urlEnfermedad).subscribe((resp)=>{
          //console.log(resp);
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          //console.log(this.imagen);
          element.imagen=this.imagen;
          element.archivo=this.convertirArchivo(resp,element.urlEnfermedad);
          console.log(element.archivo);
        });
      });
    })
  }

  eliminarEnfermedad(objetoEliminar:IEnfermedadMostrar){
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
        
          this.serviceEnfermedad.eliminar(objetoEliminar).subscribe((resp)=>{
            alert.fire('Eliminado', 'El registro ha sido eliminado', 'success'); 
            this.listaEnfermedad();
          });
         
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire('Canselado', 'El registro no se elimino', 'error');
        }
      });
  }
  modificarEnfermedadFormulario(enfermedadModificar:FormData){
    console.log(enfermedadModificar);
    this.serviceEnfermedad
        .modificar(enfermedadModificar)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Enfermedad modificada con exito");
          },
          error:(err)=>{
            mensajeError("Error al modificar la enfermedad ");
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioEnfermedad.reset();
          this.listaEnfermedad();
          }
        });
          
  }
  modificarEnfermedad(objetoModificar:IEnfermedadMostrar,content:any){
    this.formularioEnfermedad.get('urlEnfermedad').setValidators([]);
    this.formularioEnfermedad.get('urlEnfermedad').updateValueAndValidity();
    this.imagen=objetoModificar.imagen; 
    this.formularioEnfermedad.patchValue(objetoModificar);
    this.leyenda="Modificar";
    this.archivo=objetoModificar.archivo;
    this.modalService.open(content, this.modalOptions);
  }
  guardarEnfermedad(enfermedadGuardar:FormData){
    this.serviceEnfermedad
        .guardar(enfermedadGuardar)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Enfermedad guardado con exito");
          },
          error:(err)=>{
            mensajeError("Error al guardar la enfermedad");
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioEnfermedad.reset();
          this.listaEnfermedad();
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
