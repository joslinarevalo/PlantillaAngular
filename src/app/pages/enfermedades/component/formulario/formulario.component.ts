import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IEnfermedad } from "../../interfaces/IEnfermedad";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EnfermedadService } from "../../service/enfermedad.service";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.scss"],
})
export class FormularioComponent implements OnInit {
  //recibe un parametro del padre
  @Input() ModalService!: NgbModal;
  enfermedad!: IEnfermedad;
  @Input() formularioEnfermedad!: FormGroup;
  imagenMostrar!: any;
  formularioSerealizable = new FormData();
  @Output() ObjetoGuardar = new EventEmitter<FormData>();
  @Output() ObjetoModificar = new EventEmitter<FormData>();
  @Input() leyenda: string;
  @Input() imagen: any;
  @Input() archivo: File;
  contador: number = 0;
  porcentajeCompletado: number = 0;
  longitudesDeCampos: any = {};
  //mensaje: String;
  mensaje: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private serviceEnfermedad: EnfermedadService,
    private dm: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("esto imprimo antes" + this.longitudesDeCampos);
    this.obtenerLongitudesCampos();
    console.log("esto imprimo despues" + this.longitudesDeCampos);

    if (this.leyenda == "Modificar") {
      this.imagenMostrar = this.imagen;
      this.formularioSerealizable.set("imagen", this.archivo);
    }
  }

  cerrarModal() {
    this.ModalService.dismissAll();
    this.formularioEnfermedad.reset();
    this.limpiarFormData();
  }

  guardar() {
    if (this.formulario_valido()) {
      console.log(this.formularioEnfermedad);
      this.enfermedad = {
        nombreComunEnfermedad:
          this.formularioEnfermedad.controls["nombreComunEnfermedad"].value,
        nombreCientificoEnfermedad:
          this.formularioEnfermedad.controls["nombreCientificoEnfermedad"]
            .value,
        descripcionEnfermedad:
          this.formularioEnfermedad.controls["descripcionEnfermedad"].value,
        etapaEnfermedad:
          this.formularioEnfermedad.controls["etapaEnfermedad"].value,
        tipoEnfermedad:
          this.formularioEnfermedad.controls["tipoEnfermedad"].value,
        sintomasEnfermedad:
          this.formularioEnfermedad.controls["sintomasEnfermedad"].value,
        condicionFavorableEnfermedad:
          this.formularioEnfermedad.controls["condicionFavorableEnfermedad"]
            .value,
        partesAfectadasEnfermedad:
          this.formularioEnfermedad.controls["partesAfectadasEnfermedad"].value,
        urlEnfermedad:
          this.formularioEnfermedad.controls["urlEnfermedad"].value,
      };
      //this.presentacion=this.formulario.value;
      console.log(this.enfermedad); //
      this.formularioSerealizable.set(
        "enfermedad",
        JSON.stringify(this.enfermedad)
      );
      this.ObjetoGuardar.emit(this.formularioSerealizable);
      //this.recargar();
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Error en el formulario",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  modificar() {
    if (this.formulario_valido()) {
      this.enfermedad = {
        idEnfermedad: this.formularioEnfermedad.controls["idEnfermedad"].value,
        nombreComunEnfermedad:
          this.formularioEnfermedad.controls["nombreComunEnfermedad"].value,
        nombreCientificoEnfermedad:
          this.formularioEnfermedad.controls["nombreCientificoEnfermedad"]
            .value,
        descripcionEnfermedad:
          this.formularioEnfermedad.controls["descripcionEnfermedad"].value,
        etapaEnfermedad:
          this.formularioEnfermedad.controls["etapaEnfermedad"].value,
        tipoEnfermedad:
          this.formularioEnfermedad.controls["tipoEnfermedad"].value,
        sintomasEnfermedad:
          this.formularioEnfermedad.controls["sintomasEnfermedad"].value,
        condicionFavorableEnfermedad:
          this.formularioEnfermedad.controls["condicionFavorableEnfermedad"]
            .value,
        partesAfectadasEnfermedad:
          this.formularioEnfermedad.controls["partesAfectadasEnfermedad"].value,
        urlEnfermedad:
          this.formularioEnfermedad?.controls["urlEnfermedad"].value,
      };
      //console.log(this.enfermedad);
      this.formularioSerealizable.set(
        "enfermedad",
        JSON.stringify(this.enfermedad)
      );
      this.ObjetoModificar.emit(this.formularioSerealizable);
      this.recargar();
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

  formulario_valido(): boolean {
    let estado: boolean = false;
    if (this.formularioEnfermedad.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.formularioEnfermedad.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    return estado;
  }

  SeleccionarImagen(event: any) {
    let file: File = event.target.files[0];
    console.log(file);
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

  esCampoValido(campo: string) {
    const validarCampo = this.formularioEnfermedad.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }

  limpiarFormData() {
    this.formularioEnfermedad.reset(); // Esto restablecerá el estado del formulario a su valor inicial
    this.imagenMostrar = undefined; // También puedes eliminar la imagen mostrada si es necesario
    this.formularioSerealizable = new FormData(); // Limpia el FormData
  }

  contarCaracteres(idInput: String) {
    const textarea = document.getElementById(
      "" + idInput
    ) as HTMLTextAreaElement;
    let limiteCaracteres = 0;

    if (this.longitudesDeCampos.hasOwnProperty(idInput + "")) {
      limiteCaracteres = this.longitudesDeCampos[idInput + ""];
      console.log(`Campo: ${idInput}, Valor: ${limiteCaracteres}`);
    } else {
      console.log(`Campo "${idInput}" no encontrado en fieldLengths`);
    }

    this.contador = textarea.value.length;
    if (this.contador > limiteCaracteres) {
      this.contador = textarea.value.length - 1;
    }

    if (this.contador >= limiteCaracteres) {
      textarea.value = textarea.value.substring(0, limiteCaracteres);
      this.mensaje[
        idInput + ""
      ] = `Se ha alcanzado el límite de caracteres permitidos`;
    } else {
      this.mensaje[
        idInput + ""
      ] = `${this.contador} caracteres de ${limiteCaracteres} permitidos`;
    }
  }

  obtenerLongitudesCampos() {
    this.serviceEnfermedad.longitudCampos().subscribe((lista) => {
      this.longitudesDeCampos = lista;

      console.log(this.longitudesDeCampos);
    });
  }

  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  capitalizeFirstLetter(input: string): string {
    if (input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    } else {
      return input;
    }
  }
}
