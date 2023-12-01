import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { CausaenfermedadService } from "../../services/causaenfermedad.service";
import { TipoCausa } from "../../models/TipoCausa";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: "app-nuevo",
  templateUrl: "./nuevo.component.html",
  styleUrls: ["./nuevo.component.scss"],
})
export class NuevoComponent implements OnInit {
  @Input() ModalService!: NgbModal;
  causa!: TipoCausa;
  @Input() formularioCausa!: FormGroup;
  imagenMostrar!: any;
  formularioSerealizable = new FormData();
  @Output() ObjetoGuardar = new EventEmitter<FormData>();
  @Output() ObjetoCausaModificar = new EventEmitter<FormData>();
  @Input() leyenda: string;
  @Input() imagen: any;
  @Input() archivo: File;

  constructor(private router: Router, private dm: DomSanitizer) {}

  ngOnInit(): void {
    if (this.leyenda == "Modificar") {
      this.imagenMostrar = this.imagen;
      this.formularioSerealizable.set("imagen", this.archivo);
    } else {
      this.convertirImagen();
      this.formularioCausa.controls["urlTC"].setValue("No_imagen.jpg");
    }
  }

  cerrarModal() {
    this.ModalService.dismissAll();
  }

  guardar() {
    if (this.formulario_valido()) {
      this.causa = {
        tipoTC: this.formularioCausa.controls["tipoTC"].value,
        definicionTipoTC:
          this.formularioCausa.controls["definicionTipoTC"].value,
        urlTC: this.formularioCausa.controls["urlTC"].value,
      };
      this.formularioSerealizable.set("tipoCausa", JSON.stringify(this.causa));
      this.ObjetoGuardar.emit(this.formularioSerealizable);
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "error en el formulario",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  capitalizeFirstLetter(input: string): string {
    if (input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    } else {
      return input;
    }
  }
  modificar() {
    if (this.formulario_valido()) {
      this.causa = {
        idTipoCausa: this.formularioCausa.controls["idTipoCausa"].value,
        tipoTC: this.formularioCausa.controls["tipoTC"].value,
        definicionTipoTC:
          this.formularioCausa.controls["definicionTipoTC"].value,
        urlTC: this.formularioCausa.controls["urlTC"].value,
      };
      this.formularioSerealizable.set("tipoCausa", JSON.stringify(this.causa));
      this.ObjetoCausaModificar.emit(this.formularioSerealizable);
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "error en el formulario",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  esCampoValido(campo: string) {
    const validarCampo = this.formularioCausa.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }
  formulario_valido(): boolean {
    let estado: boolean = false;
    if (this.formularioCausa.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.formularioCausa.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    return estado;
  }
  SeleccionarImagen(event: any) {
    let file: File = event.target.files[0];
    if (file.size > 350000) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "La imagen excede el tamaño de pixeles.",
        showConfirmButton: false,
        timer: 2000,
      });
      event.target.value = null;
      return;
    }
    let lector = new FileReader();
    lector.readAsDataURL(event.target.files[0]);
    lector.onload = () => {
      this.imagenMostrar = lector.result;
    };
    this.formularioSerealizable.set("imagen", file);
  }
  convertirImagen() {
    const imagenPath = "assets/images/NoImage.png";

    fetch(imagenPath)
      .then((response) => response.blob())
      .then((blob) => {
        const nombreArchivo = "No_imagen.jpg";
        const archivo = new File([blob], nombreArchivo, { type: "image/jpeg" });
        this.formularioSerealizable.set("imagen", archivo);
      });
  }
}
