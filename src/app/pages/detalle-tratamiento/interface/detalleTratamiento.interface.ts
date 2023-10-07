export interface IDetalleTratamientoDTOMostrar{
        nombreTratamiento: string,
        descripcionDetalleCausa: string,
        idDetalleTratamiento: string,
        idDetalleCausa: string,
        idTratamiento: string

}
export interface IDetalleTratamientoDTOValid{
    idDetalleTratamiento?: string,
    idDetalleCausa: string,
    idTratamiento: string
}
export interface IDetalleCausaDTO{
    idDetalleCausa:string,
    descripcionDetalleCausa:string
}
export interface IDetalleTratamiento{
    nombrePesticidaTratamiento: string,
    descripcionDetalleCausa: string,
    idDetalleTratamiento: string,
    idDetalleCausa: string,
    idTratamiento: string

}