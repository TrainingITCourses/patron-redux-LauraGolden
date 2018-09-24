export interface Global {
    lanzamientos: any[];
    subCriterios: any[];
  }

  export const globalInitialState: Global = {
    lanzamientos: [],
    subCriterios: []
  };

  export enum ModoBusqueda {
    Estado = 1,
    Agencia ,
    Tipo
  }
