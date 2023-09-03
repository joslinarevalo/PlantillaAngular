import { TipoCausa } from "../../causa-enfermedad/models/TipoCausa";

export class DetalleCausa {
  idDetalleCausa?: string;
  tipoCausa?: TipoCausa;
  enfermedad?: Enfermedad;
  planta?: Planta;
  descripcionCausa: string;
}

export class Planta {
  idPlanta?: number;
  tipoPlanta?: string;
  nombreComunPlanta?: string;
}

export class Enfermedad {
  idEnfermedad?: number;
  nombreComunEnfermedad?: string;
  nombreCientificoEnfermedad?: string;
  tipoEnfermedad?: string;
}
