import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { CausaenfermedadService } from "../../services/causaenfermedad.service";
import Swal from "sweetalert2";
import { TipoCausa } from "../../models/TipoCausa";
@Component({
  selector: "app-nuevo",
  templateUrl: "./nuevo.component.html",
  styleUrls: ["./nuevo.component.scss"],
})
export class NuevoComponent implements OnInit {
  @Input() titulo!: string;
  @Input() modo: "Registrar" | "Editar";
  @Input() leyenda!: string;
  @Input() causaT!: TipoCausa;
  imagenMostrar!: any;
  tipoCausa: TipoCausa;
  formularioCausa!: FormGroup;
  @Input() imagen2: any;
  imagen: string = "Sin Imagen";
  private file: File;
  public fotoSeleccionada: File;
  modalRef: NgbModalRef | undefined;
  constructor(
    private modalService: NgbModal,

    private fb: FormBuilder,
    private router: Router,
    private causaenfermedadservice: CausaenfermedadService
  ) {
    this.formularioCausa = this.iniciarFormulario();
  }

  ngOnInit() {
    this.loadCausa();
    this.tipoCausa = {
      idTipoCausa: "",
      tipoTC: "",
      definicionTipoTC: "",
      urlTC: "",
    };
  }

  openModal(content: any) {
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

  loadCausa() {
    if (this.causaT) {
      this.formularioCausa.reset({
        definicion: this.causaT.definicionTipoTC,
        tipoTC: this.causaT.tipoTC,
        urlTC: this.causaT.urlTC,
      });
    }
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
        // this.editar();
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
      // idTipoCausa: "TY675845t",

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
      // idTipoCausa: "TY675845t",causaT
      idTipoCausa: this.causaT.idTipoCausa,
      tipoTC: this.formularioCausa.get("tipoTC").value,
      definicionTipoTC: this.formularioCausa.get("definicion").value,
      urlTC: this.formularioCausa.get("urlTipo").value,
    };
    console.log("editando", causa);
    if (this.imagen === "Sin Imagen") {
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
  }
  /*
    editar(){

    const causa: TipoCausa = {
      nombreComunTC: this.formularioCausa.get('nombreComunTC').value,
      nombreCientificoTC: this.formularioCausa.get('nombreCientificoTC').value,
        tipoTC: this.formularioCausa.get('tipoTC').value,
      
    };
    this.causaenfermedadservice.actualizar(causa).subscribe(resp=>{
      if(resp){
        Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos modificados con éxito',
          icon: 'info',
        });
        this.formularioCausa.reset();
        this.recargar();
        this.modalService.dismissAll();
      }
    
    },(err: any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al editar, hable con el administrador',
      });
    })
    }*/

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

    // No es necesario usar this.formularioCausa.value() aquí
  }
}
