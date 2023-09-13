import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPlantaValid } from '../../interface/iplanta';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlantaService } from '../../service/planta.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Itipoplanta } from 'src/app/pages/tipoplanta/interfaces/ITipoPlanta';
import { IFamilia } from 'src/app/pages/familia/interfaces/ifamilia';
import { FamiliaService } from 'src/app/pages/familia/service/familia.service';
import { TipoplantaService } from 'src/app/pages/tipoplanta/services/tipoplanta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  @Input() ModalService!:NgbModal;
  planta!:IPlantaValid;
  listFamilia:IFamilia[]=[];
  listTipoPlanta:Itipoplanta[]=[];
  @Input()formularioPlanta!:FormGroup;
  imagenMostrar!:any;
  formularioSerealizable= new FormData();
  @Output()ObjetoGuardar= new EventEmitter();
  @Output()ObjetoModificar= new EventEmitter();
  @Input()leyenda:string;
  @Input()imagen:any;
  @Input()archivo:File;
  constructor( private fb: FormBuilder, private servicePlanta:PlantaService,
    private serviceFamilia:FamiliaService,
    private serviceTipoPlanta:TipoplantaService,
    private dm:DomSanitizer) { }

  ngOnInit(): void {
    this.listaFamilia();
    this.listaTipoPlanta();
    if(this.leyenda=="Modificar"){
      this.imagenMostrar=this.imagen;
      this.formularioSerealizable.set('imagen',this.archivo);
    }
  }

  cerrarModal(){
    this.ModalService.dismissAll();
  }

  guardar() {
    if (this.formulario_valido()) {
      console.log(this.formularioPlanta);
      this.planta = {
        idFamilia: this.formularioPlanta.controls['idFamilia'].value,
        idTipoPlanta: this.formularioPlanta.controls['idTipoPlanta'].value,
        nombreCientifico: this.formularioPlanta.controls['nombreCientifico'].value,
        descripcion: this.formularioPlanta.controls['descripcion'].value,
        nombreComun: this.formularioPlanta.controls['nombreComun'].value,
        historia: this.formularioPlanta.controls['historia'].value,
        urlPlanta: this.formularioPlanta.controls['urlPlanta'].value,
      };
      //this.presentacion=this.formulario.value;
      console.log(this.planta);
      this.formularioSerealizable.set("planta",JSON.stringify(this.planta));
      this.ObjetoGuardar.emit(this.formularioSerealizable);
      }else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'error en el formulario',
          showConfirmButton: false,
          timer: 1500,
        });
      }
  }

  modificar() {
    if (this.formulario_valido()) {
      //console.log(this.formularioDetalleTratamiento);
      this.planta = {
        idFamilia: this.formularioPlanta.controls['idFamilia'].value,
        idTipoPlanta: this.formularioPlanta.controls['idTipoPlanta'].value,
        idPlanta:this.formularioPlanta.controls['idPlanta'].value,
        nombreCientifico: this.formularioPlanta.controls['nombreCientifico'].value,
        descripcion: this.formularioPlanta.controls['descripcion'].value,
        nombreComun: this.formularioPlanta.controls['nombreComun'].value,
        historia: this.formularioPlanta.controls['historia'].value,
        urlPlanta: this.formularioPlanta.controls['urlPlanta'].value,
      };
      console.log(this.planta);
      this.formularioSerealizable.set("planta",JSON.stringify(this.planta));
      this.ObjetoModificar.emit(this.formularioSerealizable);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'error en el formulario',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }



    formulario_valido(): boolean {
      let estado: boolean = false;
      if (this.formularioPlanta.valid) {
        estado = true;
      } else {
        estado = false;
        Object.values(this.formularioPlanta.controls).forEach((control) =>
          control.markAllAsTouched()
        );
      }
      return estado;
    }

    SeleccionarImagen(event:any){
      let lector=new FileReader();
      lector.readAsDataURL(event.target.files[0]);
      lector.onload=()=>{this.imagenMostrar=lector.result;}
      let file:File=event.target.files[0];
      this.formularioSerealizable.set("imagen",file);
    }

    esCampoValido(campo: string) {
      const validarCampo = this.formularioPlanta.get(campo);
      return !validarCampo?.valid && validarCampo?.touched
        ? 'is-invalid'
        : validarCampo?.touched
        ? 'is-valid'
        : '';
    }

    listaTipoPlanta(){
      this.serviceTipoPlanta.listarTipoPlanta().subscribe((resp)=>{
        this.listTipoPlanta=resp;
        console.log(resp);
      });
    }
    listaFamilia(){
      this.serviceFamilia.listarFamilia().subscribe((resp)=>{
        this.listFamilia=resp;
        console.log(resp);
      })
    }

}
