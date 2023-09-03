import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { CausaenfermedadService } from "../../services/causaenfermedad.service";
import Swal from "sweetalert2";
import { ITipoCausa, TipoCausa } from "../../models/TipoCausa";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { mensajeError, mensajeExito } from "src/app/pages/models/funciones.global";
@Component({
  selector: "app-nuevo",
  templateUrl: "./nuevo.component.html",
  styleUrls: ["./nuevo.component.scss"],
})
export class NuevoComponent implements OnInit {
  @Input() titulo!: string;
  @Input() modo: "Registrar" | "Editar";
  @Input() leyenda!: string;
  @Input() causaT!: ITipoCausa;
  imagenMostrar: SafeUrl | string | undefined;
  tipoCausa: TipoCausa;
  formularioCausa!: FormGroup;
  @Input() imagen: any;
  public fotoSeleccionada: File;
  modalRef: NgbModalRef | undefined;
  constructor(
    private modalService: NgbModal,

    private fb: FormBuilder,
    private router: Router,
    private causaenfermedadservice: CausaenfermedadService,
    private dm:DomSanitizer
  ) {
    this.formularioCausa = this.iniciarFormulario();
  }

  ngOnInit() {
    this.tipoCausa = {
      idTipoCausa: "",
      tipoTC: "",
      definicionTipoTC: "",
      urlTC: "",
    };
 // Verificar si causaT contiene una imagen
 if (this.causaT && this.causaT.urlTC ) {
  this.imagenMostrar = this.dm.bypassSecurityTrustUrl(this.causaT.imagen);
}
  }
  openModal(content: any,) {
    this.modalRef = this.modalService.open(content, {
      backdrop: "static",
      keyboard: false,
    });
  }
  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
  private iniciarFormulario(): FormGroup {
    return this.fb.group({
      definicion: ["", [Validators.required]],
      urlTipo: [null, [Validators.required]],
      tipoTC: ["", [Validators.required]],
    });
  }

  esCampoValido(campo: string) {
    const validarCampo = this.formularioCausa.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }
  guardar() {
    if (this.formularioCausa.valid) {
      if (this.causaT != null) {
         this.editando();
      } else {
        this.registrando();
      }
    } else {
      Object.keys(this.formularioCausa.controls).forEach(controlName => {
        this.formularioCausa.get(controlName).markAsTouched();
      });
    }
  }

  registrando() {
    const causa: any = {
      tipoTC: this.formularioCausa.get("tipoTC").value,
      definicionTipoTC: this.formularioCausa.get("definicion").value,
      urlTC: this.formularioCausa.get("urlTipo").value,
    };
    this.causaenfermedadservice
      .addTipoCausa(causa, this.fotoSeleccionada)
      .subscribe({
        next: (resp) => {
          mensajeExito("Tipo de Causa guardado con exito");
        },
        error: (err) => {
          mensajeError("Error al guardar el Tipo de causa");
        },
        complete: () => {
          this.modalService.dismissAll();
          this.formularioCausa.reset();
          this.recargar();
         
        },
      });
  }
  editando() {
    const causa: any = {
      idTipoCausa: this.causaT.idTipoCausa,
      tipoTC: this.formularioCausa.get("tipoTC").value,
      definicionTipoTC: this.formularioCausa.get("definicion").value,
      urlTC: this.formularioCausa.get("urlTipo").value,
    };
    console.log("editando", causa);
      this.causaenfermedadservice.editarTipoCausa(causa).subscribe({
        next: (resp) => {
          mensajeExito("Tipo de Causa editado con exito");
        },
        error: (err) => {
          mensajeError("Error al guardar el Tipo de causa");
        },
        complete: () => {
          this.modalService.dismissAll();
          this.formularioCausa.reset();
          this.recargar();
         
        },
      });
    
  }

  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  SeleccionarImagen(event: any) {
    let lector = new FileReader();
    lector.readAsDataURL(event.target.files[0]);
    lector.onload = () => {
      this.imagenMostrar = lector.result;
    };
    let file: File = event.target.files[0];
    this.fotoSeleccionada = file; // Guarda la foto seleccionada en una variable de clase
  }
}
