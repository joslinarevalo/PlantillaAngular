import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouteReuseStrategy, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetallecausaService } from "../../services/detallecausa.service";
import {
  DetalleCausa,
  DetalleCausaValid,
  Enfermedad,
  Planta,
} from "../../models/DetalleCausa";
import { TipoCausa } from "src/app/pages/causa-enfermedad/models/TipoCausa";
import {
  mensajeError,
  mensajeExito,
} from "src/app/pages/models/funciones.global";
@Component({
  selector: "app-nuevo",
  templateUrl: "./nuevo.component.html",
  styleUrls: ["./nuevo.component.css"],
})
export class NuevoComponent implements OnInit {
  @Input() leyenda!: string;
  @Input() modo: "Registrar" | "Editar";
  @Input() titulo!: string;
  @Input() detalledto!: DetalleCausa;
  @Input() detallcausa!: DetalleCausaValid;
  public iddetalleCausa;
  listEnfermedad: Enfermedad[] = [];
  listTipoCausa: TipoCausa[] = [];
  listaPlanta: Planta[];
  formularioDetalleCausa!: FormGroup;
  errores: string[];
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private detallecausaservice: DetallecausaService
  ) {
    this.formularioDetalleCausa = this.iniciarFormulario();
  }

  ngOnInit() {
    this.obtenerenfermedad();
    this.obtenerTipo();
    this.obtenerPlantas();
    this.loaddetalleCausa();
  }
  loaddetalleCausa() {
    if (this.detalledto) {
      this.formularioDetalleCausa.patchValue({
        idPlanta: this.detalledto.planta,
        idEnfermedad: this.detalledto.enfermedad,
        idTipoCausa: this.detalledto.tipoCausa,
        descripcionD: this.detalledto.descripcionCausa,
      });
    }
  }

  private iniciarFormulario(): FormGroup {
    return this.fb.group({
      idPlanta: [this.detalledto?.planta || null, Validators.required],
      idEnfermedad: [this.detalledto?.enfermedad || null, Validators.required],
      idTipoCausa: [this.detalledto?.tipoCausa || null, Validators.required],
      descripcionD: ["", [Validators.required, Validators.maxLength(3000)]],
    });
  }

  openModal(content: any) {
    if (this.modo === "Editar") {
      this.loaddetalleCausa();
      // obtiene el id del registro
      this.iddetalleCausa = this.detalledto?.idDetalleCausa;
      console.log("ID del registro:", this.iddetalleCausa);
    }
    this.modalService.open(content, {
      size: "xl",
      centered: true,
      backdrop: "static",
      keyboard: false,
    });
  }

  obtenerPlantas() {
    this.detallecausaservice
      .getPlantas()
      .subscribe((planta) => (this.listaPlanta = planta));
  }
  obtenerenfermedad() {
    this.detallecausaservice.listaenfermedad().subscribe((data) => {
      this.listEnfermedad = data;
    });
  }
  obtenerTipo() {
    this.detallecausaservice.listatipocausa().subscribe((data) => {
      this.listTipoCausa = data;
    });
  }
  esCampoValido(campo: string) {
    const validarCampo = this.formularioDetalleCausa.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }

  guardar() {
    console.log("Formulario válido:", this.formularioDetalleCausa.valid);
    if (this.formularioDetalleCausa.valid) {
      if (this.modo === "Editar") {
        // Lógica para editar
        console.log("Entrando en la función editar");
        this.editando();
      } else {
        console.log("Entrando en la función guardar");
        this.registrando();
      }
    } else {
      // Marcar los campos inválidos como tocados para mostrar los mensajes de error
      Object.keys(this.formularioDetalleCausa.controls).forEach(
        (controlName) => {
          this.formularioDetalleCausa.get(controlName).markAsTouched();
        }
      );
    }
  }

  registrando() {
    const dtCausa: DetalleCausaValid = {
      descripcionCausa: this.formularioDetalleCausa.get("descripcionD").value,
      idEnfermedad:
        this.formularioDetalleCausa.get("idEnfermedad").value.idEnfermedad,
      idTipoCausa:
        this.formularioDetalleCausa.get("idTipoCausa").value.idTipoCausa,
      idPlanta: this.formularioDetalleCausa.get("idPlanta").value.idPlanta,
    };
    console.log("provando", dtCausa);
    this.detallecausaservice.registrarDetalleCausa(dtCausa).subscribe({
      next: (resp) => {
        mensajeExito("Detalle de Causa guardado con exito");
      },
      error: (e) => {
        mensajeError(e.error.Mensaje);
      },
      complete: () => {
        this.modalService.dismissAll();
        this.formularioDetalleCausa.reset();
        this.recargar();
      },
    });
  }

  editando() {
    const dtCausa: DetalleCausaValid = {
      idDetalleCausa: this.iddetalleCausa,
      descripcionCausa: this.formularioDetalleCausa.get("descripcionD").value,
      idEnfermedad:
        this.formularioDetalleCausa.get("idEnfermedad").value.idEnfermedad,
      idTipoCausa:
        this.formularioDetalleCausa.get("idTipoCausa").value.idTipoCausa,
      idPlanta: this.formularioDetalleCausa.get("idPlanta").value.idPlanta,
    };
    console.log(dtCausa);

    this.detallecausaservice.modificar(dtCausa).subscribe({
      next: (resp) => {
        mensajeExito("Detalle de Causa editado con exito");
      },
      error: (err) => {
        mensajeError(err.error.Mensaje);
      },
      complete: () => {
        this.modalService.dismissAll();
        this.formularioDetalleCausa.reset();
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
}
