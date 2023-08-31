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
import { DataTableDirective } from "angular-datatables";
import { Subject, Subscription } from "rxjs";
import { TablaComponent } from "../tabla/tabla.component";

@Component({
  selector: "app-nuevo",
  templateUrl: "./nuevo.component.html",
  styleUrls: ["./nuevo.component.css"],
})
export class NuevoComponent implements OnInit {
  @ViewChild(TablaComponent, { static: false })
  tablaComponent: TablaComponent;

  private dtCausa: DetalleCausa 
  @Input() leyenda!: string;
  @Input() modo: "Registrar" | "Editar";
  @Input() titulo!: string;
  @Input() detalledto!: DetalleCausa;
  listEnfermedad: Enfermedad[] = [];
  listTipoCausa: TipoCausa[] = [];
  listaPlanta: Planta[];
  formularioDetalleCausa!: FormGroup;
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
    this.modalService.open(content, { size: "xl", centered: true,    backdrop: 'static',
    keyboard: false});
  }
  compararPlanta(o1: Planta, o2: Planta) {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.idPlanta === o2.idPlanta;
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
    if (controlName === 'planta') {
      this.formularioDetalleCausa.patchValue({ idPlanta: seleccion.idPlanta });
      this.dtCausa.planta = seleccion;
    } else if (controlName === 'enfermedad') {
      this.formularioDetalleCausa.patchValue({ idEnfermedad: seleccion.idEnfermedad });
      this.dtCausa.enfermedad = seleccion;
    } else if (controlName === 'tipoCausa') {
      this.formularioDetalleCausa.patchValue({ idTipoCausa: seleccion.idTipoCausa });
      this.dtCausa.tipoCausa = seleccion;
    }
  }
  
  registrando() {
    const detalle: any = {
      descripcionCausa: this.formularioDetalleCausa.get("descripcionD").value,
      idEnfermedad: this.dtCausa.enfermedad.idEnfermedad,
      idTipoCausa: this.dtCausa.tipoCausa.idTipoCausa,
      idPlanta: this.dtCausa.planta.idPlanta,
    };
    
    console.log(detalle);
  
    this.detallecausaservice.registrarDetalleCausa(detalle).subscribe({
      next: (resp) => {
        mensajeExito("Detalle de Causa guardado con exito");
      },
      error: (err) => {
        mensajeError("Error al guardar el detalle de causa");
      },
      complete: () => {
        this.modalService.dismissAll();
        this.formularioDetalleCausa.reset();
        if (this.tablaComponent) {
          this.tablaComponent.reloadTable();
        }
       
      },
    });
  }
  
  editando() {
    const idDetalleCausa = this.detalledto ? this.detalledto.idDetalleCausa : null;
    const descripcionCausa = this.formularioDetalleCausa.get("descripcionD").value;
    const idEnfermedad = this.detalledto && this.detalledto.enfermedad ? this.detalledto.enfermedad.idEnfermedad : null;
    const idTipoCausa = this.detalledto && this.detalledto.tipoCausa ? this.detalledto.tipoCausa.idTipoCausa : null;
    const idPlanta = this.detalledto && this.detalledto.planta ? this.detalledto.planta.idPlanta : null;
  
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
      },
      complete: () => {
        this.modalService.dismissAll();
        this.formularioDetalleCausa.reset();
        if (this.tablaComponent) {
          this.tablaComponent.reloadTable();
        }
       
      },
    });
  }
  
  guardar() {
    console.log("Formulario válido:", this.formularioDetalleCausa.valid);
    if (this.formularioDetalleCausa.valid) {
      if(this.detalledto==null){
        console.log("Entrando en la función guardar");
        this.registrando();
      }else{
        console.log("Entrando al else");
        this.editando();
      }
    } else {
      // Marcar los campos inválidos como tocados para mostrar los mensajes de error
      Object.keys(this.formularioDetalleCausa.controls).forEach(controlName => {
        this.formularioDetalleCausa.get(controlName).markAsTouched();
      });
    }
  }
  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
 
 
}
