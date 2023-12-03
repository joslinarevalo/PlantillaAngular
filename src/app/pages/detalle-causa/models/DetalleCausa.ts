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
  
}
export class TipoCausas {
  idTipoCausa?: string;
  tipoTC?: string;
}
export class DetalleCausaValid {
  idDetalleCausa?: string;
  idPlanta?: string;
  idEnfermedad?: number;
  idTipoCausa?: string;
  descripcionCausa: string;
}