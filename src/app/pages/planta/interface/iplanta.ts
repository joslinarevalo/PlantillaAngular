import { IFamilia } from "../../familia/interfaces/ifamilia";
import { Itipoplanta } from "../../tipoplanta/interfaces/ITipoPlanta";

export interface IPlantaMostrar {
  nombreCientifico: string;
  descripcionPlanta:      string;
  tipoPlanta:       string;
  nombreComunPlanta:      string;
  historia:         string;
  idTipoPlanta:     string;
  nombreFamilia:    string;
  idPlanta?:         string;
  idFamilia:        string;
  urlPlanta:        string;
  imagen?:          any;
  archivo?:         File;
}

export interface IPlanta {
  nombreCientifico: string;
  descripcionPlanta:      string;
  tipoPlanta:       Itipoplanta;
  nombreComunPlanta:      string;
  historia:         string;
  idPlanta?:         string;
  familia:        IFamilia;
  urlPlanta?:        string;
  imagen?:          any;
  archivo?:         File;
}


export interface IPlantaValid {
  nombreCientifico?: string;
  descripcionPlanta?:      string;
  nombreComunPlanta?:      string;
  historia?:         string;
  idTipoPlanta?:     string;
  idPlanta?:         string;
  idFamilia?:        string;
  urlPlanta?:        string;
  imagen?:          any;
  archivo?:         File;
}

export interface IBuscarPlanta {
  nombreCientifico: string;
  descripcionPlanta: string;
  tipoPlanta: string;
  nombreComunPlanta: string;
  historia: string;
  idTipoPlanta: string;
  nombreFamilia:string;
  idPlanta?:  string;
  idFamilia:  string;
  urlPlanta: string;
  imagen?:   any;
  archivo?: File;
}

