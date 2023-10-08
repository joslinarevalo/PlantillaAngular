import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouteReuseStrategy, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetallecausaService } from "../../services/detallecausa.service";
import { DetalleCausa, Enfermedad, Planta } from "../../models/DetalleCausa";
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
  private dtCausa: DetalleCausa;
  @Input() leyenda!: string;
  @Input() modo: "Registrar" | "Editar";
  @Input() titulo!: string;
  @Input() detalledto!: DetalleCausa;
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
  }

  private iniciarFormulario(): FormGroup {
    this.dtCausa = new DetalleCausa(); // Inicializar dtCausa aquí

    return this.fb.group({
      planta: [this.detalledto?.planta || null, Validators.required],
      enfermedad: [this.detalledto?.enfermedad || null, Validators.required],
      tipoCausa: [this.detalledto?.tipoCausa || null, Validators.required],
      descripcionD: ["", [Validators.required, Validators.maxLength(3000)]],
    });
  }

  openModal(content: any) {
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
  SeleccionadaSelectId(event: any, controlName: string) {
    const seleccion = event;

    // Actualizar el formulario y asignar al objeto dtCausa según el control seleccionado
    if (controlName === "planta") {
      this.formularioDetalleCausa.patchValue({ idPlanta: seleccion.idPlanta });
      this.dtCausa.planta = seleccion;
    } else if (controlName === "enfermedad") {
      this.formularioDetalleCausa.patchValue({
        idEnfermedad: seleccion.idEnfermedad,
      });
      this.dtCausa.enfermedad = seleccion;
    } else if (controlName === "tipoCausa") {
      this.formularioDetalleCausa.patchValue({
        idTipoCausa: seleccion.idTipoCausa,
      });
      this.dtCausa.tipoCausa = seleccion;
    }
  }
  guardar() {
    console.log("Formulario válido:", this.formularioDetalleCausa.valid);
    if (this.formularioDetalleCausa.valid) {
      if (this.detalledto == null) {
        console.log("Entrando en la función guardar");
        this.registrando();
      } else {
        console.log("Entrando al else");
        //this.editar();
        this.editando();
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
    const detalle: any = {
      descripcionCausa: this.formularioDetalleCausa.get("descripcionD").value,
      idEnfermedad: this.dtCausa.enfermedad.idEnfermedad,
      idTipoCausa: this.dtCausa.tipoCausa.idTipoCausa,
      idPlanta: this.dtCausa.planta.idPlanta,
    };
 

    this.detallecausaservice.registrarDetalleCausa(detalle).subscribe({
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
    const idDetalleCausa = this.detalledto
      ? this.detalledto.idDetalleCausa
      : null;
    const descripcionCausa =
      this.formularioDetalleCausa.get("descripcionD").value;
    const idEnfermedad =
      this.detalledto && this.detalledto.enfermedad
        ? this.detalledto.enfermedad.idEnfermedad
        : null;
    const idTipoCausa =
      this.detalledto && this.detalledto.tipoCausa
        ? this.detalledto.tipoCausa.idTipoCausa
        : null;
    const idPlanta =
      this.detalledto && this.detalledto.planta
        ? this.detalledto.planta.idPlanta
        : null;

    const detalle: any = {
      idDetalleCausa: idDetalleCausa,
      descripcionCausa: descripcionCausa,
      idEnfermedad: idEnfermedad,
      idTipoCausa: idTipoCausa,
      idPlanta: idPlanta,
    };
    console.log(detalle);

    this.detallecausaservice.modificar(detalle).subscribe({
      next: (resp) => {
        mensajeExito("Detalle de Causa editado con exito");
      },
      error: (err) => {
        mensajeError("Error al guardar el detalle de causa");
        console.error('Código del error desde el backend: ' + err.status);
      },
      complete: () => {
        this.modalService.dismissAll();
        this.formularioDetalleCausa.reset();
        this.recargar();
      },
    });
  }

  editar() {
  
    const detalle: DetalleCausa = {
      idDetalleCausa: this.detalledto!.idDetalleCausa,
      tipoCausa: {
        idTipoCausa: this.formularioDetalleCausa.get("tipoCausa").value,
      },
      enfermedad: {
        idEnfermedad: this.formularioDetalleCausa.get("enfermedad").value,
      },
      planta: {
        idPlanta: this.formularioDetalleCausa.get("planta").value,
      },
      descripcionCausa: this.formularioDetalleCausa.get("descripcionD").value,
    };
    console.log(this.detalledto);
    const idDetalleCausa = this.detalledto
    ? this.detalledto.idDetalleCausa
    : null;
  const descripcionCausa =
    this.formularioDetalleCausa.get("descripcionD").value;
  const idEnfermedad =
    this.detalledto && this.detalledto.enfermedad
      ? this.detalledto.enfermedad.idEnfermedad
      : null;
  const idTipoCausa =
    this.detalledto && this.detalledto.tipoCausa
      ? this.detalledto.tipoCausa.idTipoCausa
      : null;
  const idPlanta =
    this.detalledto && this.detalledto.planta
      ? this.detalledto.planta.idPlanta
      : null;

  const detalless: any = {
    idDetalleCausa: idDetalleCausa,
      tipoCausa: {
        idTipoCausa: idTipoCausa,
      },
      enfermedad: {
        idEnfermedad: idEnfermedad,
      },
      planta: {
         idPlanta: idPlanta,
      },
      descripcionCausa: descripcionCausa,
  };
  console.log(detalless);
    this.detallecausaservice.update(detalless).subscribe(
      {
      next: (resp) => {
        mensajeExito("Detalle de Causa editado con exito");
      },
      error: (err) => {
       // mensajeError("Error al guardar el detalle de causa");
       // this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err);
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
