import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { CausaenfermedadService } from "../../services/causaenfermedad.service";
import Swal from "sweetalert2";
import { ITipoCausa, TipoCausa } from "../../models/TipoCausa";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
      Swal.fire({
        position: "center",
        title: "Faltan datos en el formulario",
        text:
          "Submit disparado, formulario no válido" + this.formularioCausa.valid,
        icon: "warning",
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
      .subscribe(
        (resp: any) => {
          if (resp) {
            console.log(resp);
            Swal.fire({
              position: "center",
              title: "Buen trabajo",
              text: "Datos guardados con exito",
              icon: "info",
            });
            this.formularioCausa.reset();
            this.recargar();
            this.modalService.dismissAll();
          }
        },
        (err: any) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Algo paso, hable con el administrador",
          });
        }
      );
  }
  editando() {
    const causa: any = {
      idTipoCausa: this.causaT.idTipoCausa,
      tipoTC: this.formularioCausa.get("tipoTC").value,
      definicionTipoTC: this.formularioCausa.get("definicion").value,
      urlTC: this.formularioCausa.get("urlTipo").value,
    };
    console.log("editando", causa);
      this.causaenfermedadservice.editarTipoCausa(causa).subscribe(
        (resp: any) => {
          if (resp) {
            Swal.fire({
              position: "center",
              title: "Buen trabajo!",
              text: `Datos Modificados con exito`,
              icon: "info",
            });
            this.formularioCausa.reset();
            this.recargar();
            this.modalService.dismissAll();
          }
        },
        (err: any) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Algo pasó hable con el administrador`,
          });
        }
      );
    
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
