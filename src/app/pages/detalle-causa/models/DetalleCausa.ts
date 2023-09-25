import { TipoCausa } from "../../causa-enfermedad/models/TipoCausa";

export class DetalleCausa {
  idDetalleCausa?: string;
  tipoCausa?: TipoCausa;
  enfermedad?: Enfermedad;
  planta?: Planta;
  descripcionCausa: string;
}

export class Planta {
  idPlanta?: string;
  nombreComunPlanta?: string;
}

export class Enfermedad {
  idEnfermedad?: number;
  nombreComunEnfermedad?: string;
  nombreCientificoEnfermedad?: string;
  tipoEnfermedad?: string;
  urlEnfermedad?:string
  imagen?:any
  archivo?:File
}
