export class DetalleCausa{
    id?:number;
    descripcionCausa?:string;
    enfermedad?: Enfermedad;
    tipoCausa?:TipoCausa;
}

export class Enfermedad {
    idenfermedad?:number;
    nombreEnfermedad?:string;
    tipoEnfermedad?:string;
    descripcionEnfermedad?:string;
}
export class TipoCausa {
    idTipoCausa?:number;
    nombreComunTC?:string;
    nombreCientificoTC?:string;
    tipoTC?:string;
}

export interface IConsulta{
    enfermedad: Enfermedad,
    tipoCausa: TipoCausa,
    descripcionCausa?:string;
  }