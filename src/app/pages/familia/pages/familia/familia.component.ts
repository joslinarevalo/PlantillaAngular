import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { IFamilia } from '../../interfaces/ifamilia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamiliaService } from '../../service/familia.service';
import { DomSanitizer } from '@angular/platform-browser';
import { mensajeError, mensajeExito } from '../../models/funciones.global';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.scss']
})
export class FamiliaComponent implements OnInit {

  modalOptions: NgbModalOptions = {
    ariaLabelledBy: 'modal-basic-title',
    size: 'sm', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop:'static'
  };

  familiaList:IFamilia[]=[];
  formularioFamilia!:FormGroup;
  leyenda:string="";


  constructor(public modalService:NgbModal,
    private serviceFamilia:FamiliaService,
    private dm:DomSanitizer,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.listaFamilia();
    this.formularioFamilia=this.inicializarFormulario();
  }

  openModal(content: any) {
    this.leyenda="Registrar";
    this.modalService.open(content, this.modalOptions);
  }

  listaFamilia(){
    this.serviceFamilia.listarFamilia().subscribe((resp)=>{
      this.familiaList=resp;
    })
  }

  inicializarFormulario(): FormGroup {
    return this.fb.group({
      idfamilia: [''],
      nombreFamilia: ['', [Validators.required]],
    });
  }

  guardarFamilia(familiaGuardar:IFamilia){
    this.serviceFamilia
        .guardarFamilia(familiaGuardar)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Familia guardado con exito");
            this.recargar();
          },
          error:(err)=>{
            mensajeError(err.error.Mensaje);
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioFamilia.reset();
          this.listaFamilia();
          }
        });

  }

eliminarFamilia(objetoEliminar:IFamilia){
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

          this.serviceFamilia.eliminarFamilia(objetoEliminar).subscribe({
          next: (resp) => {
            mensajeExito("El registro ha sido eliminado");//+ resp.Mensaje
            this.recargar();
          },
          error: (e) => {
            mensajeError(e.error.Mensaje);
          },
          complete: () => {
            this.modalService.dismissAll();
            this.formularioFamilia.reset();
            this.listaFamilia();
          }
        });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire('Cancelado', 'El registro no se elimino', 'error');
        }
      });
  }

  modificarFamilia(objetoModificar:IFamilia,content:any){
    this.formularioFamilia.patchValue(objetoModificar);
    this.leyenda="Modificar";
    this.modalService.open(content, this.modalOptions);
  }

  modificarFamiliaFormulario(familiaModificar:IFamilia){
    this.serviceFamilia
        .modificarFamilia(familiaModificar)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Familia modificada con exito");
            this.recargar();
          },
          error:(err)=>{
            mensajeError(err.error.Mensaje);
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioFamilia.reset();
          this.listaFamilia();
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
