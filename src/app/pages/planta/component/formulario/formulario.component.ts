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
import { Router } from '@angular/router';

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
  @Input()formularioPlanta!: FormGroup;
  imagenMostrar!:any;
  formularioSerealizable= new FormData();
  @Output()ObjetoGuardar= new EventEmitter();
  @Output()ObjetoModificar= new EventEmitter();
  @Input()leyenda:string;
  @Input()imagen:any;
  @Input()archivo:File;
  contador: number = 0;
  porcentajeCompletado: number = 0;
  longitudesDeCampos: any = {};
  //mensaje: String;
  mensaje: { [key: string]: string } = {};

  constructor( private fb: FormBuilder, private servicePlanta:PlantaService,
    private serviceFamilia:FamiliaService,
    private serviceTipoPlanta:TipoplantaService,
    private dm:DomSanitizer,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerLongitudesCampos();
    this.listaFamilia();
    this.listaTipoPlanta();

    if(this.leyenda=="Modificar"){
      this.imagenMostrar=this.imagen;
      this.formularioSerealizable.set('imagen',this.archivo);
    }else{this.convertirImagen();
      this.formularioPlanta.controls['urlPlanta'].setValue('No_imagen.jpg');
    }
  }

  cerrarModal(){
    this.ModalService.dismissAll();
    this.formularioPlanta.reset();
    this.limpiarFormData();
  }

  guardar() {
    if (this.formulario_valido()) {
      console.log(this.formularioPlanta);
      this.planta = {
        idFamilia: this.formularioPlanta.controls['idFamilia'].value,
        idTipoPlanta: this.formularioPlanta.controls['idTipoPlanta'].value,
        nombreCientifico: this.formularioPlanta.controls['nombreCientifico'].value,
        descripcionPlanta: this.formularioPlanta.controls['descripcionPlanta'].value,
        nombreComunPlanta: this.formularioPlanta.controls['nombreComunPlanta'].value,
        historia: this.formularioPlanta.controls['historia'].value,
        urlPlanta: this.formularioPlanta.controls['urlPlanta'].value,
      };
      //this.presentacion=this.formulario.value;
      console.log(this.planta);
      this.formularioSerealizable.set("planta",JSON.stringify(this.planta));
      this.ObjetoGuardar.emit(this.formularioSerealizable);
      this.recargar();
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
      this.planta = {
        idFamilia: this.formularioPlanta.controls['idFamilia'].value,
        idTipoPlanta: this.formularioPlanta.controls['idTipoPlanta'].value,
        idPlanta:this.formularioPlanta.controls['idPlanta'].value,
        nombreCientifico: this.formularioPlanta.controls['nombreCientifico'].value,
        descripcionPlanta: this.formularioPlanta.controls['descripcionPlanta'].value,
        nombreComunPlanta: this.formularioPlanta.controls['nombreComunPlanta'].value,
        historia: this.formularioPlanta.controls['historia'].value,
        urlPlanta: this.formularioPlanta.controls['urlPlanta'].value,
      };
      console.log(this.planta);
      this.formularioSerealizable.set("planta",JSON.stringify(this.planta));
      this.ObjetoModificar.emit(this.formularioSerealizable);
      this.recargar();
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

    limpiarFormData() {
      this.formularioPlanta.reset(); // Esto restablecerá el estado del formulario a su valor inicial
      this.imagenMostrar = undefined; // También puedes eliminar la imagen mostrada si es necesario
      this.formularioSerealizable = new FormData(); // Limpia el FormData
    }

    contarCaracteres(idInput:String) {
      const textarea = document.getElementById(""+idInput) as HTMLTextAreaElement;
      let limiteCaracteres = 0;

      if (this.longitudesDeCampos.hasOwnProperty(idInput+"")) {
        limiteCaracteres = this.longitudesDeCampos[idInput+""];
        console.log("si: " +this.longitudesDeCampos)
        console.log(`Campo: ${idInput}, Valor: ${limiteCaracteres}`);
      } else {
        console.log("no: " +this.longitudesDeCampos)
        console.log(`Campo "${idInput}" no encontrado en fieldLengths`);
      }

      this.contador = textarea.value.length;
      if(this.contador > limiteCaracteres){
        this.contador = textarea.value.length-1;
      }

      if (this.contador >= limiteCaracteres) {
        textarea.value = textarea.value.substring(0, limiteCaracteres);
        this.mensaje[idInput+""] = `Se ha alcanzado el límite de caracteres permitidos`;
      }else{
        this.mensaje[idInput+""] = `${this.contador} caracteres de ${limiteCaracteres} permitidos`;
      }
    }

    obtenerLongitudesCampos() {
      this.servicePlanta.longitudCampos().subscribe((lista) => {
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

    convertirImagen() {
      const imagenPath = 'assets/images/NoImage.png';

     fetch(imagenPath)
      .then((response) => response.blob())
      .then((blob) => {
      const nombreArchivo = 'No_imagen.jpg';
      const archivo = new File([blob], nombreArchivo, { type: 'image/jpeg' });
     console.log('Imagen convertida a File:', archivo);
      this.formularioSerealizable.set('imagen',archivo);
      });
      }

      capitalizeFirstLetter(input: string): string {
        if (input) {
          return input.charAt(0).toUpperCase() + input.slice(1);
        } else {
          return input;
        }
      }
}
