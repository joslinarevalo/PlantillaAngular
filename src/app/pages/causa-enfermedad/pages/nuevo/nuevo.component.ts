import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoCausa } from 'src/app/pages/detalle-causa/models/DetalleCausa';
import Swal from 'sweetalert2';
import { CausaenfermedadService } from '../../services/causaenfermedad.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {
  @Input() titulo!: string;
  @Input() modo: 'Registrar' | 'Editar';
  @Input() leyenda!: string;
  @Input() causaT!: TipoCausa;
  tipoCausa:TipoCausa;
  formularioCausa!: FormGroup;
  constructor(private modalService: NgbModal, 
    private fb: FormBuilder, private router: Router,
    private causaenfermedadservice:CausaenfermedadService) {
      this.formularioCausa = this.iniciarFormulario();
     }

  ngOnInit() {
   
    this.loadCausa();
    this.tipoCausa={
      idtipoCausa: 0,
      nombreComunTC: "",
      nombreCientificoTC: "",
      tipoTC: ""
    };
  }
  openModal(content: any) {
    this.modalService.open(content);
  }
  private iniciarFormulario(): FormGroup {
    return this.fb.group({
     // bibliotequita: [this.libritos.bibliotequita!.id, [Validators.required]],
     nombreComunTC: ['', [Validators.required]],
     nombreCientificoTC: ['', [Validators.required]],
     tipoTC: [null, [Validators.required]],

    })
  }
  loadCausa() {
    if (this.causaT) {
      this.formularioCausa.reset({
        nombreComunTC: this.causaT.nombreComunTC,
        nombreCientificoTC: this.causaT.nombreCientificoTC,
        tipoTC: this.causaT.tipoTC
        
      });
    }
  }
  esCampoValido(campo: string) {
    const validarCampo = this.formularioCausa.get(campo);
    return !validarCampo?.valid && validarCampo?.touched ? 'is-invalid' : validarCampo?.touched ? 'is-valid' : '';
  }
  guardar() {
    if (this.formularioCausa.valid) {
      if (this.causaT !=null) {
        this.editar();
      } else {
       this.registrando();
      }
    } else {
      Swal.fire({
        position: 'center',
        title: 'Faltan datos en el formulario',
        text: 'Submit disparado, formulario no válido' + this.formularioCausa.valid,
        icon: 'warning',
      });
    }
  }
  registrando() {
    const causa: any = {
      nombreComunTC: this.formularioCausa.get('nombreComunTC').value,
      nombreCientificoTC: this.formularioCausa.get('nombreCientificoTC').value,
        tipoTC: this.formularioCausa.get('tipoTC').value,
      
    };
    this.causaenfermedadservice.registrar(causa).subscribe((resp: any) => {
      if (resp) {
        console.log("entro a respuesta"); 
         console.log(resp); 
         Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos guardados con exito',
          icon: 'info',
       });
        this.formularioCausa.reset();
       this.recargar();
        this.modalService.dismissAll();
      }
      console.log("entro"); 
      console.log(resp); 
      
    }, (err: any) => {
      /* console.log(err); */
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo paso, hable con el administrador',
      });
    })
  }
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
    }
  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

}
