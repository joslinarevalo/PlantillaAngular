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
  @Input() imagen: any;
  public fotoSeleccionada: File;
  predefinedImageUrl: string = "assets/images/NoImage.png";

  archivo: File;
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
 
  
    if (this.leyenda === "Editar") {
      if (this.causaT.urlTC) {
        this.imagenMostrar = this.dm.bypassSecurityTrustUrl(this.causaT.urlTC); // Cambia 'imagen' por 'urlTC'
      }
    }
  }

  openModal(content: any) {
    this.formularioCausa.reset();
    if (this.causaT.urlTC ) {
      this.imagenMostrar = this.dm.bypassSecurityTrustUrl(this.causaT.imagen);
    }
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
      urlTipo: [""],
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
        // Verifica si no se ha seleccionado una imagen
        if (!this.fotoSeleccionada) {
          // Crea un Blob a partir de la URL de la imagen predefinida
          fetch(this.predefinedImageUrl)
            .then((response) => response.blob())
            .then((blob) => {
              const file = new File([blob], "No_imagen.jpg");
              this.fotoSeleccionada = file;
              this.registrando();
            })
            .catch((error) => {
              console.error("Error al cargar la imagen predefinida:", error);
            });
        } else {
          this.registrando();
        }
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
        tipoTC:
          this.formularioCausa.get("tipoTC").value.charAt(0).toUpperCase() +
          this.formularioCausa.get("tipoTC").value.slice(1),
        definicionTipoTC:
          this.formularioCausa.get("definicion").value.charAt(0).toUpperCase() +
          this.formularioCausa.get("definicion").value.slice(1),
        urlTC: this.formularioCausa.get("urlTipo").value,
      };

      // Verifica si no se seleccionó una imagen y proporciona un valor predeterminado
      if (!this.fotoSeleccionada) {
        causa.urlTC = ""; // Cambia esto al valor predeterminado que desees
      }

      this.causaenfermedadservice
        .addTipoCausa(causa, this.fotoSeleccionada)
        .subscribe({
          next: (resp) => {
            mensajeExito("Tipo de Causa guardado con éxito");
          },
          error: (e) => {
            mensajeError(e.error.Mensaje);
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
    const tipoTC =
      this.formularioCausa.get("tipoTC").value.charAt(0).toUpperCase() +
      this.formularioCausa.get("tipoTC").value.slice(1);
    const definicionTipoTC =
      this.formularioCausa.get("definicion").value.charAt(0).toUpperCase() +
      this.formularioCausa.get("definicion").value.slice(1);
    const urlTC = this.formularioCausa.get("urlTipo").value;
  
    const tipoCausa: TipoCausa = {
      idTipoCausa: this.causaT.idTipoCausa,
      tipoTC: tipoTC,
      definicionTipoTC: definicionTipoTC,
      urlTC: this.causaT.urlTC || urlTC, // Mantén la imagen existente si no seleccionas una nueva
    };
  
    // Verifica si se ha seleccionado una nueva imagen
    if (this.fotoSeleccionada) {
      // Se ha seleccionado una nueva imagen, asigna la imagen a this.fotoSeleccionada
      this.causaT.imagen = this.fotoSeleccionada;
    } else {
      // No se ha seleccionado una nueva imagen, asigna la imagen existente
      this.causaT.imagen = this.imagen; // Reemplaza 'imagen' con el campo correcto
      console.log("IMAGEN", this.causaT.imagen);
    }
  
    console.log("editando", tipoCausa);
  
    this.causaenfermedadservice.editarTipoCausa(tipoCausa, this.fotoSeleccionada).subscribe({
      next: (resp) => {
        mensajeExito("Tipo de Causa editado con éxito");
      },
      error: (e) => {
        if (e.status === 400) {
          // Maneja el error de validación del lado del servidor
          if (e.error && e.error.Mensaje) {
            mensajeError(e.error.Mensaje);
          } else {
            mensajeError("Error desconocido al editar el tipo de causa.");
          }
        } else {
          // Maneja otros tipos de errores (p. ej., error de red o del servidor)
          mensajeError("Error de red o servidor al editar el tipo de causa.");
        }
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
    console.log('Evento de selección de imagen:', event);
    const fileInput = event.target;
  
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log('Archivo seleccionado:', file);
      this.fotoSeleccionada = file;
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.imagenMostrar = this.dm.bypassSecurityTrustUrl(e.target.result);
      };
  
      reader.readAsDataURL(file);
    }
  }
  

  /*SeleccionarImagen(event: any) {
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
  }*/
}
