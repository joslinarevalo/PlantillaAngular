import { Component, Input, OnInit } from "@angular/core";
import { ITipoCausa, TipoCausa } from "../../models/TipoCausa";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { CausaenfermedadService } from "../../services/causaenfermedad.service";
import Swal from "sweetalert2";
import {
  mensajeError,
  mensajeExito,
} from "src/app/pages/models/funciones.global";

@Component({
  selector: "app-mostrarCausa",
  templateUrl: "./mostrarCausa.component.html",
  styleUrls: ["./mostrarCausa.component.scss"],
})
export class MostrarCausaComponent implements OnInit {
  modalOptions: NgbModalOptions = {
    ariaLabelledBy: "modal-basic-title",
    size: "lg", // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop: "static",
  };
  causaList: ITipoCausa[] = [];
  imagen: any;
  formulariocausa!: FormGroup;
  leyenda: string = "";
  archivo: File;
  constructor(
    public modalService: NgbModal,
    private causaenfermedadservice: CausaenfermedadService,
    private dm: DomSanitizer,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listatipo();
    this.formulariocausa = this.iniciarFormulario();
  }
  openModal(content: any) {
    this.leyenda = "Registrar";
    this.formulariocausa.reset();
    this.modalService.open(content, this.modalOptions);
  }
  private iniciarFormulario(): FormGroup {
    return this.fb.group({
      idTipoCausa: [""],
      definicionTipoTC: ["", [Validators.required]],
      urlTC: [""],
      tipoTC: ["", [Validators.required]],
    });
  }

  listatipo() {
    this.causaenfermedadservice.listaDeTipoCausa().subscribe((resp) => {
      this.causaList = resp;
      console.log(resp);
      this.causaList.forEach((element) => {
        this.causaenfermedadservice
          .getImagen(element.urlTC)
          .subscribe((resp) => {
            let url = URL.createObjectURL(resp);
            this.imagen = this.dm.bypassSecurityTrustUrl(url);
            element.imagen = this.imagen;
            element.archivo = this.convertirArchivo(resp, element.urlTC);
            console.log(element.archivo);
          });
      });
    });
  }
  eliminarCausa(ObjetoCausaEliminar: ITipoCausa) {
    const alert = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    alert
      .fire({
        title: "¿Estas Seguro?",
        text: `¡No podras revertir esto!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borrar",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.causaenfermedadservice
            .eliminarCausa(ObjetoCausaEliminar)
            .subscribe({
              next: (resp) => {
                mensajeExito(" Eliminada con exito "); //+ resp.Mensaje
                this.listatipo();
              },
              error: (err) => {
                console.log("error en el console: "+err.Mensaje);
                mensajeError("Error al  el tipo Causa: " + err.Mensaje);
              },
              complete: () => {
                this.modalService.dismissAll();
                this.formulariocausa.reset();
                this.listatipo();
              },
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire("Canselado", "El registro no se elimino", "error");
        }
      });
  }
  modificarCausaFormulario(tipocausa: FormData) {
    this.causaenfermedadservice.modificarcausa(tipocausa).subscribe({
      next: (resp) => {
        console.log(resp);
        mensajeExito("Tipo de causa modificado con exito");
      },
      error: (err) => {
        mensajeError("Error al modificar el tipo de causa"+err.Mensaje);
      },
      complete: () => {
        this.modalService.dismissAll();
        this.formulariocausa.reset();
        this.listatipo();
      },
    });
  }
  modificarcausatipo(ObjetoCausaModificar: ITipoCausa, content: any) {
    this.formulariocausa.get("urlTC").setValidators([]);
    this.formulariocausa.get("urlTC").updateValueAndValidity();
    this.imagen = ObjetoCausaModificar.imagen;
    this.formulariocausa.patchValue(ObjetoCausaModificar);
    this.leyenda = "Modificar";
    this.archivo = ObjetoCausaModificar.archivo;
    this.modalService.open(content, this.modalOptions);
  }
  guardarCausa(tipoCausa: FormData) {
    this.causaenfermedadservice.guardarcausa(tipoCausa).subscribe({
      next: (resp) => {
        console.log(resp);
        mensajeExito("Tipo de Causa guardado con exito");
      },
      error: (err) => {
        console.log(err.Mensaje);
        mensajeError("Error al guardar el tipo Causa: " + err.Mensaje);
      },
      complete: () => {
        this.modalService.dismissAll();
        this.formulariocausa.reset();
        this.listatipo();
      },
    });
  }
  convertirArchivo(blob: Blob | undefined, url: string): File {
    let miArchivo!: File;
    let nombre = url.substring(36);
    console.log("nombre del archivo a modificar: " + nombre);
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
