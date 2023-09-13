export interface IPlantaMostrar {
  nombreCientifico: string;
  descripcion:      string;
  tipoPlanta:       string;
  nombreComun:      string;
  historia:         string;
  idTipoPlanta:     string;
  nombreFamilia:    string;
  idPlanta?:         string;
  idFamilia:        string;
  urlPlanta:        string;
  imagen?:          any;
  archivo?:         File;
}

export interface IPlantaValid {
  nombreCientifico?: string;
  descripcion?:      string;
  nombreComun?:      string;
  historia?:         string;
  idTipoPlanta?:     string;
  idPlanta?:         string;
  idFamilia?:        string;
  urlPlanta?:        string;
  imagen?:          any;
  archivo?:         File;
}



