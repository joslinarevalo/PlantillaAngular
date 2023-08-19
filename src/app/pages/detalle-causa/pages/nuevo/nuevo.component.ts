import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleCausa, Enfermedad, TipoCausa } from '../../models/DetalleCausa';
import { DetallecausaService } from '../../services/detallecausa.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  //@Input() sintomaOd!: ISintoma;
  @Input() leyenda!: string;
  @Input() titulo!: string;
  @Input() queryString: string;
  listEnfermedad: Enfermedad[] = [];
  listTipoCausa: TipoCausa[]=[];
  constructor( private modalService: NgbModal, 
    private fb: FormBuilder, private router: Router,private detallecausaservice:DetallecausaService) { }

  ngOnInit() {
    this.obtener();
    this.obtenerTipo();
  }
  openModal(content: any) {
    this.modalService.open(content);
  }
  extraLarge(exlargeModal: any) {
    this.modalService.open(exlargeModal, { size: 'xl', centered: true });
  }
  obtener() {
    this.detallecausaservice.listaenfermedad()
      .subscribe(data => {
        this.listEnfermedad = data;//
        console.log(data);
      });
  }
  obtenerTipo() {
    this.detallecausaservice.listatipocausa()
      .subscribe(data => {
        this.listTipoCausa = data;//
        console.log(data);
      });
  }
}
