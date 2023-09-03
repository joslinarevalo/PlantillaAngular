export interface ITratamientoMostrar{
    idTratamiento?:number,
    nombrePesticidaTratamiento:string,
    descripcionTratamiento:string,
    aplicacionTratamiento:string,
    indicacionesTratamiento:string,
    tipoTratamiento:string,
    urlTratamiento:string,
    imagen?:any,
    archivo?:File
}
export interface ITratamientoDTOValid{
    idTratamiento?:number,
    nombrePesticidaTratamiento:string,
    descripcionTratamiento:string,
    aplicacionTratamiento:string,
    indicacionesTratamiento:string,
    tipoTratamiento:string,
    urlTratamiento:string
}