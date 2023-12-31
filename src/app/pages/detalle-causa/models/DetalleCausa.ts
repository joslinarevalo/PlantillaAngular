export class DetalleCausa {
  iddetalleCausa?: number;
  descripcionCausa?: string;
  enfermedad?: Enfermedad;
  tipoCausa?: TipoCausa;
}

export class Enfermedad {
  idenfermedad?: number;
  nombreEnfermedad?: string;
  tipoEnfermedad?: string;
  descripcionEnfermedad?: string;
}
export class TipoCausa {
  idtipoCausa?: number;
  nombreComunTC?: string;
  nombreCientificoTC?: string;
  tipoTC?: string;
}

export class DTOdetalle {
  descripcionCausa: string;
  tipoCausa: string;
  enfermedad: string;
  iddetallecausa: number;
}
