import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { CausaenfermedadService } from "../../services/causaenfermedad.service";
import { ITipoCausa, TipoCausa } from "../../models/TipoCausa";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import {
  mensajeError,
  mensajeExito,
} from "src/app/pages/models/funciones.global";
@Component({
  selector: "app-nuevo",
  templateUrl: "./nuevo.component.html",
  styleUrls: ["./nuevo.component.scss"],
})
export class NuevoComponent implements OnInit {
  @Input() titulo!: string;
  @Input() modo: "Registrar" | "Editar";
  @Input() leyenda!: string;
  @Input() causaT!: ITipoCausa | null;
  imagenMostrar: SafeUrl | string | undefined;
  tipoCausa: TipoCausa;
  formularioCausa!: FormGroup;
  formularioSerealizable= new FormData();
  @Input() imagen: any;
  public fotoSeleccionada: File;
  archivo:File;
  modalRef: NgbModalRef | undefined;
  constructor(
    private modalService: NgbModal,

    private fb: FormBuilder,
    private router: Router,
    private causaenfermedadservice: CausaenfermedadService,
    private dm: DomSanitizer
  ) {
    this.formularioCausa = this.iniciarFormulario();
    this.causaT = null;
  }

  ngOnInit() {
    this.tipoCausa = {
      idTipoCausa: "",
      tipoTC: "",
      definicionTipoTC: "",
      urlTC: "",
    };
    //
   
    
  }

  openModal(content: any) {
    this.formularioCausa.reset();
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
      urlTipo: [''],
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
      Object.keys(this.formularioCausa.controls).forEach((controlName) => {
        this.formularioCausa.get(controlName).markAsTouched();
      });
    }
  }
  
  registrando() {
    if (this.formularioCausa.valid) {
      const causa: any = {
        tipoTC: this.formularioCausa.get("tipoTC").value,
        definicionTipoTC: this.formularioCausa.get("definicion").value,
        urlTC: this.formularioCausa.get("urlTipo").value,
      };
  
      // Verifica si no se seleccionó una imagen y proporciona un valor predeterminado
      if (!this.fotoSeleccionada) {
        causa.urlTC = ''; // Cambia esto al valor predeterminado que desees
      }
  
      this.causaenfermedadservice
        .addTipoCausa(causa, this.fotoSeleccionada)
        .subscribe({
          next: (resp) => {
            mensajeExito("Tipo de Causa guardado con éxito");
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
    } else {
      Object.keys(this.formularioCausa.controls).forEach((controlName) => {
        this.formularioCausa.get(controlName).markAsTouched();
      });
    }
  }
  
  editando() {
    // Obtener los valores del formulario
    const tipoTC = this.formularioCausa.get("tipoTC").value;
    const definicionTipoTC = this.formularioCausa.get("definicion").value;
    const urlTC = this.formularioCausa.get("urlTipo").value;

    // Crear un objeto TipoCausa con los valores
    const tipoCausa: TipoCausa = {
      idTipoCausa: this.causaT.idTipoCausa,
      tipoTC: tipoTC,
      definicionTipoTC: definicionTipoTC,
      urlTC: urlTC,
    };

    console.log("editando", tipoCausa);

    this.causaenfermedadservice
      .editarTipoCausa(tipoCausa, this.fotoSeleccionada)
      .subscribe({
        next: (resp) => {
          mensajeExito("Tipo de Causa editado con éxito");
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
      this.imagenMostrar = this.dm.bypassSecurityTrustUrl(
        lector.result as string
      );
    };
    let file: File = event.target.files[0];
    this.fotoSeleccionada = file; // Guarda la foto seleccionada en una variable de clase
    if (this.causaT) {
      this.causaT.imagen = this.imagenMostrar;
    }
  }
}
