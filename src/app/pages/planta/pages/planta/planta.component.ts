import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PlantaService } from '../../service/planta.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlantaMostrar, IPlantaValid } from '../../interface/iplanta';
import Swal from 'sweetalert2';
import { mensajeError, mensajeExito } from 'src/app/pages/models/funciones.global';

@Component({
  selector: 'app-planta',
  templateUrl: './planta.component.html',
  styleUrls: ['./planta.component.scss']
})
export class PlantaComponent implements OnInit {

  modalOptions: NgbModalOptions = {
    ariaLabelledBy: 'modal-basic-title',
    size: 'lg', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop:'static'
  };

  plantaList:IPlantaMostrar[]=[];
  imagen:any;
  formularioPlanta!:FormGroup;
  leyenda:string="";
  archivo:File;

  constructor(public modalService:NgbModal, private servicePlanta:PlantaService,
    private dm:DomSanitizer, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listaPlanta();
    this.formularioPlanta=this.inicializarFormulario();
  }

  openModal(content: any) {
    this.leyenda="Registrar";
    this.modalService.open(content, this.modalOptions);

  }

  listaPlanta(){
    this.servicePlanta.listaDePlanta().subscribe((resp)=>{
      this.plantaList=resp;
      console.log(resp);
      this.plantaList.forEach(element => {
        this.servicePlanta.getImagen(element.urlPlanta).subscribe((resp)=>{
          //console.log(resp);
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          //console.log(this.imagen);
          element.imagen=this.imagen;
          element.archivo=this.convertirArchivo(resp,element.urlPlanta);
          console.log(element.archivo);
        });
      });

    })
  }

  inicializarFormulario(): FormGroup {
    return this.fb.group({
      idPlanta: [''],
      nombreCientifico: ['', [Validators.required]],
      nombreComun: ['', [Validators.required]],
      idFamilia: ['', [Validators.required]],
      idTipoPlanta: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      historia: ['', [Validators.required]],
      urlPlanta: ['', [Validators.required]],

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

  eliminarPlanta(objetoEliminar:IPlantaMostrar){
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

          this.servicePlanta.eliminarPlanta(objetoEliminar).subscribe((resp)=>{
            alert.fire('Eliminado', 'El registro ha sido eliminado', 'success');
            this.listaPlanta();
          });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire('Canselado', 'El registro no se elimino', 'error');
        }
      });
  }

  guardarPlanta(planta:FormData){

    this.servicePlanta
        .guardarPlanta(planta)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Planta guardado con exito");
          },
          error:(err)=>{
            mensajeError("Detalle Error al guardar la planta");
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioPlanta.reset();
          this.listaPlanta();
          }
        });

  }

  modificarPlantaFormulario(plantaModificar:FormData){

    this.servicePlanta
        .modificarPlanta(plantaModificar)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Planta modificado con exito");
          },
          error:(err)=>{
            mensajeError("Error al modificar el Planta");
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioPlanta.reset();
          this.listaPlanta();
          }
        });

  }

  modificarPlanta(objetoModificar:IPlantaMostrar,content:any){
    this.formularioPlanta.get('urlPlanta').setValidators([]);
    this.formularioPlanta.get('urlPlanta').updateValueAndValidity();
    this.imagen=objetoModificar.imagen;
    this.formularioPlanta.patchValue(objetoModificar);
    this.leyenda="Modificar";
    this.archivo=objetoModificar.archivo;
     this.modalService.open(content, this.modalOptions);
  }

}