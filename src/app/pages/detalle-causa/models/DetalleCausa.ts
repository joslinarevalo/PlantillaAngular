export class DetalleCausa{
    id?:number;
    descripcionCausa?:string;
    enfermedad?: Enfermedad;
    tipoCausa?:TipoCausa;
}

export class Enfermedad {
    idenfermedad?:number;
    nombre_enfermedad?:string;
}
export class TipoCausa {
    id_tipo_causa?:number;
    nombre_comun_tc?:string;
}