import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';

import Swal from 'sweetalert2';
import { Itipoplanta } from '../../interfaces/ITipoPlanta';
import { TipoplantaService } from '../../services/tipoplanta.service';
import { mensajeError, mensajeExito } from 'src/app/pages/familia/models/funciones.global';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tipoplanta',
  templateUrl: './tipoplanta.component.html',
  styleUrls: ['./tipoplanta.component.scss']
})
export class TipoplantaComponent implements OnInit {

  modalOptions: NgbModalOptions = {
    ariaLabelledBy: 'modal-basic-title',
    size: 'sm', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop:'static'
  };

  tipoPlantaList:Itipoplanta[]=[];
  formularioTipoPlanta!:FormGroup;
  leyenda:string="";


  constructor(public modalService:NgbModal,
    private serviceTipoPlanta:TipoplantaService,
    private dm:DomSanitizer,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.listaTipoPlanta();
    this.formularioTipoPlanta=this.inicializarFormulario();
  }

  openModal(content: any) {
    this.leyenda="Registrar";
    this.modalService.open(content, this.modalOptions);
  }

  listaTipoPlanta(){
    this.serviceTipoPlanta.listarTipoPlanta().subscribe((resp)=>{
      this.tipoPlantaList=resp;
      console.log(resp);
    })
  }

  inicializarFormulario(): FormGroup {
    return this.fb.group({
      idTipoPlanta: [''],
      tipoPlanta: ['', [Validators.required]],
    });
  }

  guardarTipoPlanta(tipoPlantaGuardar:Itipoplanta){
    this.serviceTipoPlanta
        .guardarTipoPlanta(tipoPlantaGuardar)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Tipo de planta guardado con exito");
            this.recargar();
          },
          error:(err)=>{
            mensajeError("Error al guardar el Tipo de planta, Ya existe");
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioTipoPlanta.reset();
          this.listaTipoPlanta();
          }
        });

  }

eliminarTipoPlanta(objetoEliminar:Itipoplanta){
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

          this.serviceTipoPlanta.eliminarTipoPlanta(objetoEliminar).subscribe({
            next: (resp) => {
              mensajeExito("El registro ha sido eliminado");//+ resp.Mensaje
              this.recargar();
            },
            error: (e) => {
              mensajeError(e.error.Mensaje);
            },
            complete: () => {
              this.modalService.dismissAll();
              this.formularioTipoPlanta.reset();
              this.listaTipoPlanta();
            }
          });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire('Cancelado', 'El registro no se elimino', 'error');
        }
      });
  }

  modificarTipoPlanta(objetoModificar:Itipoplanta,content:any){
    this.formularioTipoPlanta.patchValue(objetoModificar);
    this.leyenda="Modificar";
    this.modalService.open(content, this.modalOptions);
  }

  modificarTipoPlantaFormulario(tipoPlantaModificar:Itipoplanta){
    console.log(tipoPlantaModificar);
    this.serviceTipoPlanta
        .modificarTipoPlanta(tipoPlantaModificar)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Tipo de planta modificado con exito");
            this.recargar();
          },
          error:(err)=>{
            mensajeError("Error al modificar el tipo de planta ");
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioTipoPlanta.reset();
          this.listaTipoPlanta();
          }
        });

  }

  recargar(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

}
