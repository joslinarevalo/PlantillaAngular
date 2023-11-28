import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PlantaService } from '../../service/planta.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IPlantaMostrar } from '../../interface/iplanta';
import Swal from 'sweetalert2';
import { mensajeError, mensajeExito } from 'src/app/pages/models/funciones.global';
import { Router } from '@angular/router';

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
    private dm:DomSanitizer, private fb: FormBuilder, private router: Router) { }

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
      nombreCientifico: ['', [Validators.required, this.noSoloEspacios()]],
      nombreComunPlanta: ['', [Validators.required, this.noSoloEspacios()]],
      idFamilia: ['', [Validators.required, this.noSoloEspacios()]],
      idTipoPlanta: ['', [Validators.required, this.noSoloEspacios()]],
      descripcionPlanta: ['', [Validators.required, this.noSoloEspacios()]],
      historia: ['', [Validators.required, this.noSoloEspacios()]],
      urlPlanta: ['', [Validators.required, this.noSoloEspacios()]],

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

          this.servicePlanta.eliminarPlanta(objetoEliminar).subscribe({

            next: (resp) => {
              mensajeExito("El registro ha sido eliminado");//+ resp.Mensaje
              this.recargar();
            },
            error: (e) => {
              mensajeError(e.error.Mensaje);
            },
            complete: () => {
              this.modalService.dismissAll();
              this.formularioPlanta.reset();
              this.listaPlanta();
            }

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
          next: (resp) => {
            mensajeExito("El registro ha sido eliminado");//+ resp.Mensaje
            this.recargar();
          },
          error: (e) => {
            mensajeError(e.error.Mensaje);
          },
          complete: () => {
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
            this.recargar();
          },
          error:(err)=>{
            //mensajeError("Error al modificar el Planta");
            mensajeError(err.error.Mensaje)
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

  noSoloEspacios(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const inputValue = control.value;
      // Verificar si inputValue es una cadena de texto antes de aplicar .trim()
      if (typeof inputValue === 'string' && inputValue.trim() === '') {
        return { 'espaciosVacios': true };
      }
      return null;
    };
  }

  recargar(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }



}
