import { Component, Input, OnInit } from '@angular/core';
import { ITipoPlanta } from '../../interfaces/ITipoPlanta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoplantaService } from '../../services/tipoplanta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  @Input() tipoPlantaOd!: ITipoPlanta;
  @Input() leyenda!: string;
  @Input() titulo!: string;
  @Input() queryString: string;

  formBuilder!: FormGroup;
  p: any;
  card: ITipoPlanta;
  idSintoma: string = '';

  constructor(
    private tipoPlantaService : TipoplantaService,
    private modalService: NgbModal,
    private fb: FormBuilder, private router: Router
  ) { }

  ngOnInit(): void {
    this.formBuilder = this.iniciarFormulario();
  }

  private iniciarFormulario(): FormGroup{
    return this.fb.group({
      tipoPlanta: ['',[Validators.required]]
    })
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  guardar() {
    if (this.formBuilder.valid) {
      if (this.tipoPlantaOd != null) {
        this.editando();
      } else {
        this.registrando();
      }
    } else {
      Swal.fire({
        position: 'center',
        title: 'Faltan datos en el formuario',
        text: 'submit disparado, formulario no valido ' + this.formBuilder.valid,
        icon: 'warning',
      });
    }
  }

  registrando() {
    const tipoPlanta = this.formBuilder.value;
    this.tipoPlantaService.guardarTipoPlanta(tipoPlanta).subscribe((resp: any) => {
      if (resp) {
        Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos guardados con exito',
          icon: 'info',
        });
        this.formBuilder.reset();
        this.recargar();
        this.modalService.dismissAll();
      }
    }, (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo paso, hable con el administrador',
      });
    })
  }

  editando() {

    this.tipoPlantaOd.tipoPlanta = this.formBuilder.controls['tipoPlanta'].value;

    this.tipoPlantaService.editarTipoPlanta(this.tipoPlantaOd).subscribe((resp: any) => {
      if (resp) {
        //console.log(resp);
        Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos guardados con exito',
          icon: 'info',
        });
        this.formBuilder.reset();
        this.recargar();
        this.modalService.dismissAll();
      }
    }, (err: any) => {
      //console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo paso, hable con el administrador',
      });
    })
  }

}
