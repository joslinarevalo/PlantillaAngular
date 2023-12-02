import { Component, OnInit } from '@angular/core';
import { IDetalleCausaDTOMostrar, IDetalleCausaDTOValid } from '../../interface/detalleCausa.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DetalleCausaService } from '../../services/detalle-causa.service';
import Swal from 'sweetalert2';
import { mensajeError, mensajeExito } from 'src/app/pages/models/funciones.global';

@Component({
  selector: 'app-detalle-causa',
  templateUrl: './detalle-causa.component.html',
  styleUrls: ['./detalle-causa.component.scss']
})
export class DetalleCausaComponent implements OnInit {
  listaDetalleCausa:IDetalleCausaDTOMostrar[]=[];
  formularioDetalleCausa!:FormGroup;
  leyenda:string="";
  modalOptions: NgbModalOptions = {
    ariaLabelledBy: 'modal-basic-title',
    size: 'lg', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop:'static'
  };
  constructor(public modalService:NgbModal,private detalleCausaService:DetalleCausaService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listDetalleCausa();
    this.formularioDetalleCausa=this.inicializarFormulario();
  }
  openModal(content: any) {
    this.leyenda="Registrar";
    this.formularioDetalleCausa.reset();
    this.modalService.open(content, this.modalOptions);

  }
  inicializarFormulario(): FormGroup {
    return this.fb.group({
      idDetalleCausa: [''],
      idTipo: ['', [Validators.required]],
      idEnfermedad: ['', [Validators.required]],
      idPlanta: ['', [Validators.required]],
      descripcionCausa: ['', [Validators.required]],
  });
  }

  eliminarCausa(objetoEliminar:IDetalleCausaDTOMostrar){
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

          this.detalleCausaService.eliminarDetalleCausa(objetoEliminar).subscribe({
            next:(resp)=>{
              mensajeExito("Detalle de Causa eliminado con exito");
            },
            error:(err)=>{
              mensajeError("Error al eliminar el detalle de Causa"+err.Mensaje);
            },
            complete:()=>{
            this.modalService.dismissAll();
            this.listDetalleCausa();
            }
          });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire('Canselado', 'El registro no se elimino', 'error');
        }
      });
  }
  modificarCausaFormulario(CausaModificar:IDetalleCausaDTOValid){
    console.log(CausaModificar);
    this.detalleCausaService
        .modificarDetalleCausa(CausaModificar)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Detalle de Causa modificado con exito");
          },
          error:(err)=>{
            mensajeError("Error al modificar el detalle de Causa: "+err.Mensaje);
            this.modalService.dismissAll();
            this.formularioDetalleCausa.reset();
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioDetalleCausa.reset();
          this.listDetalleCausa();
          }
        });

  }
  modificarCausa(objetoModificar:IDetalleCausaDTOMostrar,content:any){
    this.formularioDetalleCausa.patchValue(objetoModificar);
    this.leyenda="Modificar";
     this.modalService.open(content, this.modalOptions);
  }
  guardarCausa(CausaGuardar:IDetalleCausaDTOValid){
    console.log(CausaGuardar)
    this.detalleCausaService
        .guardarDetalleCausa(CausaGuardar)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Detalle Causa guardado con exito");
          },
          error:(err)=>{
            mensajeError("Detalle Error al guardar el Detalle Causa: "+err.Mensaje);
            this.modalService.dismissAll();
            this.formularioDetalleCausa.reset();
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioDetalleCausa.reset();
          this.listDetalleCausa();
          }
        });

  }
  listDetalleCausa(){
    this.detalleCausaService.listaDetalleCausa().subscribe((resp)=>{
      this.listaDetalleCausa=resp;
    });
  }


}
