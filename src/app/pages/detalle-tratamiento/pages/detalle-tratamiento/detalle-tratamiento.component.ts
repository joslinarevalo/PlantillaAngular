import { Component, OnInit } from '@angular/core';
import { IDetalleTratamientoDTOMostrar, IDetalleTratamientoDTOValid } from '../../interface/detalleTratamiento.interface';
import { DetalleTratamientoService } from '../../service/detalle-tratamiento.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { mensajeError, mensajeExito } from 'src/app/pages/models/funciones.global';

@Component({
  selector: 'app-detalle-tratamiento',
  templateUrl: './detalle-tratamiento.component.html',
  styleUrls: ['./detalle-tratamiento.component.scss']
})
export class DetalleTratamientoComponent implements OnInit {
  listaDetalleTratamiento:IDetalleTratamientoDTOMostrar[]=[];
  formularioDetalleTratamiento!:FormGroup;
  leyenda:string="";
  modalOptions: NgbModalOptions = {
    ariaLabelledBy: 'modal-basic-title',
    size: 'lg', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop:'static'
  };
  constructor(public modalService:NgbModal,private detalleTratamientoService:DetalleTratamientoService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listDetalleTratamiento();
    this.formularioDetalleTratamiento=this.inicializarFormulario();
  }
  openModal(content: any) {
    this.leyenda="Registrar";
    this.formularioDetalleTratamiento.reset();
    this.modalService.open(content, this.modalOptions);

  }
  inicializarFormulario(): FormGroup {
    return this.fb.group({
      idDetalleTratamiento: [''],
      idTratamiento: ['', [Validators.required]],
      idDetalleCausa: ['', [Validators.required]]
  });
  }

  eliminarTratamiento(objetoEliminar:IDetalleTratamientoDTOMostrar){
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

          this.detalleTratamientoService.eliminarDetalleTratamiento(objetoEliminar).subscribe({
            next:(resp)=>{
              mensajeExito("Detalle de tratamiento eliminado con exito");
            },
            error:(err)=>{
              mensajeError("Error al eliminar el detalle de tratamiento"+err.Mensaje);
            },
            complete:()=>{
            this.modalService.dismissAll();
            this.listDetalleTratamiento();
            }
          });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire('Canselado', 'El registro no se elimino', 'error');
        }
      });
  }
  modificarTratamientoFormulario(tratamientoModificar:IDetalleTratamientoDTOValid){
    this.detalleTratamientoService
        .modificarDetalleTratamiento(tratamientoModificar)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Detalle de tratamiento modificado con exito");
          },
          error:(err)=>{
            mensajeError("Error al modificar el detalle de tratamiento"+err.Mensaje);
            this.modalService.dismissAll();
            this.formularioDetalleTratamiento.reset();
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioDetalleTratamiento.reset();
          this.listDetalleTratamiento();
          }
        });

  }
  modificarTratamiento(objetoModificar:IDetalleTratamientoDTOMostrar,content:any){
    this.formularioDetalleTratamiento.patchValue(objetoModificar);
    this.leyenda="Modificar";
     this.modalService.open(content, this.modalOptions);
  }
  guardarTratamiento(tratamientoGuardar:IDetalleTratamientoDTOValid){

    this.detalleTratamientoService
        .guardarDetalleTratamiento(tratamientoGuardar)
        .subscribe({
          next:(resp)=>{
            mensajeExito("Detalle Tratamiento guardado con exito");
          },
          error:(err)=>{
            mensajeError("Detalle Error al guardar el tratamiento: "+err.Mensaje);
            this.modalService.dismissAll();
            this.formularioDetalleTratamiento.reset();
          },
          complete:()=>{
          this.modalService.dismissAll();
          this.formularioDetalleTratamiento.reset();
          this.listDetalleTratamiento();
          }
        });

  }
  listDetalleTratamiento(){
    this.detalleTratamientoService.listaDetalleTratamiento().subscribe((resp)=>{
      this.listaDetalleTratamiento=resp;
    });
  }

}

