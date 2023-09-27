import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { IEnfermedadMostrar } from '../../interfaces/IEnfermedad';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
    size: 'xl', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop: 'static'
  };
  enfermedadList: IEnfermedadMostrar[] = [];
  imagen: any;
  formularioEnfermedad!: FormGroup;
  leyenda: string = "";
  archivo: File;
  constructor(public modalService: NgbModal, private serviceEnfermedad: EnfermedadService,
    private dm: DomSanitizer, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listaEnfermedad();
    this.formularioEnfermedad = this.inicializarFormulario();
  }

  openModal(content: any) {
    this.leyenda = "Registrar";
    this.modalService.open(content, this.modalOptions);
  }

  inicializarFormulario(): FormGroup {
    return this.fb.group({
      idEnfermedad: [''],
      nombreComunEnfermedad: ['', [Validators.required, this.noSoloEspacios()]],
      nombreCientificoEnfermedad: ['', [Validators.required, this.noSoloEspacios()]],
      descripcionEnfermedad: ['', [Validators.required, this.noSoloEspacios()]],
      etapaEnfermedad: ['', [Validators.required, this.noSoloEspacios()]],
      tipoEnfermedad: ['', [Validators.required, this.noSoloEspacios()]],
      sintomasEnfermedad: ['', [Validators.required, this.noSoloEspacios()]],
      condicionFavorableEnfermedad: ['', [Validators.required, this.noSoloEspacios()]],
      partesAfectadasEnfermedad: ['', [Validators.required, this.noSoloEspacios()]],
      urlEnfermedad: ['', [Validators.required, this.noSoloEspacios()]]
    });
  }

  listaEnfermedad() {
    this.serviceEnfermedad.listaEnfermedades()
    /* .subscribe({
      next: (resp) => {
        this.enfermedadList = resp;
        console.log(resp);
        this.enfermedadList.forEach(element => {
          this.serviceEnfermedad.getImagen(element.urlEnfermedad).subscribe((resp) => {
            //console.log(resp);
            let url = URL.createObjectURL(resp);
            this.imagen = this.dm.bypassSecurityTrustUrl(url);
            //console.log(this.imagen);
            element.imagen = this.imagen;
            element.archivo = this.convertirArchivo(resp, element.urlEnfermedad);
            console.log(element.archivo);
          });
        });
        mensajeExito("Enfermedad modificada con exito ");//+ resp.Mensaje
      },
      error: (value) => {
        mensajeError("Error al modificar la enfermedad "+value.Mensaje); 
      },
      complete: () => {
        this.modalService.dismissAll();
        this.formularioEnfermedad.reset();
        this.listaEnfermedad();
      }
    }); */
    .subscribe((resp) => {
      this.enfermedadList = resp;
      console.log(resp);
      this.enfermedadList.forEach(element => {
        this.serviceEnfermedad.getImagen(element.urlEnfermedad).subscribe((resp) => {
          //console.log(resp);
          let url = URL.createObjectURL(resp);
          this.imagen = this.dm.bypassSecurityTrustUrl(url);
          //console.log(this.imagen);
          element.imagen = this.imagen;
          element.archivo = this.convertirArchivo(resp, element.urlEnfermedad);
          console.log(element.archivo);
        });
      });
    })
  }

  eliminarEnfermedad(objetoEliminar: IEnfermedadMostrar) {
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

          this.serviceEnfermedad.eliminar(objetoEliminar).subscribe({
            next: (resp) => {
              mensajeExito("Enfermedad eliminada con exito ");//+ resp.Mensaje
            },
            error: (e) => {
              mensajeError(e.error.Mensaje);
            },
            complete: () => {
              this.modalService.dismissAll();
              this.formularioEnfermedad.reset();
              this.listaEnfermedad();
            }
          });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire('Canselado', 'El registro no se elimino', 'error');
        }
      });
  }

  modificarEnfermedadFormulario(enfermedadModificar: FormData) {
    console.log(enfermedadModificar);
    this.serviceEnfermedad.modificar(enfermedadModificar)
      .subscribe({
        next: (resp) => {
          mensajeExito("Enfermedad modificada con exito ");//+ resp.Mensaje
        },
        error: (e) => {
          mensajeError(e.error.Mensaje); 
        },
        complete: () => {
          this.modalService.dismissAll();
          this.formularioEnfermedad.reset();
          this.listaEnfermedad();
        }
      });
  }

  modificarEnfermedad(objetoModificar: IEnfermedadMostrar, content: any) {
    this.formularioEnfermedad.get('urlEnfermedad').setValidators([]);
    this.formularioEnfermedad.get('urlEnfermedad').updateValueAndValidity();
    this.imagen = objetoModificar.imagen;
    this.formularioEnfermedad.patchValue(objetoModificar);
    this.leyenda = "Modificar";
    this.archivo = objetoModificar.archivo;
    this.modalService.open(content, this.modalOptions);
  }

  guardarEnfermedad(enfermedadGuardar: FormData) {
    this.serviceEnfermedad
      .guardar(enfermedadGuardar)
      .subscribe({
        next: (resp) => {
          mensajeExito("Enfermedad guardado con exito ");//+ resp
        },
        error: (e) => {
          mensajeError(e.error.Mensaje); 
        },
        complete: () => {
          this.modalService.dismissAll();
          this.formularioEnfermedad.reset();
          this.listaEnfermedad();
        }
      });

  }

  convertirArchivo(blob: Blob | undefined, url: string): File {
    let miArchivo!: File;
    let nombre = url.substring(36);
    //console.log("nombre del archivo a modificar: " + nombre);
    if (blob != undefined) {
      miArchivo = new File([blob], nombre, {
        type: blob.type,
      });
      return miArchivo;
    } else {
      return miArchivo;
    }
  }

  // Esta función de validación verificará si el valor contiene solo espacios en blanco.
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

  /* validarImagen(control: any) {
    const archivo = control.value;
    if (!archivo) {
      return null; // No se seleccionó ningún archivo
    }

    const tipoPermitido = ['image/jpeg', 'image/png', 'image/gif']; // Tipos MIME de imágenes permitidos
    const tamanoMaximo = 20 * 1024 * 1024; // 20 MB en bytes

    if (tipoPermitido.indexOf(archivo.type) === -1) {
      return { formatoInvalido: true }; // Tipo de archivo no permitido
    }
    if (archivo.size > tamanoMaximo) {
      return { tamanoExcedido: true }; // Tamaño del archivo excede el límite
    }

    return null; // Archivo válido
  } */

}
