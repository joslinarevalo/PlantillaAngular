export interface IDetalleTratamientoDTOMostrar{
        nombreTratamiento: string,
        descripcionDetalleCausa: string,
        idDetalleTratamiento: number,
        idDetalleCausa: number,
        idTratamiento: number

}
export interface IDetalleTratamientoDTOValid{
    idDetalleTratamiento?: number,
    idDetalleCausa: number,
    idTratamiento: number
}
export interface IDetalleCausaDTO{
    idCausa:number,
    descripcionCausa:string
}