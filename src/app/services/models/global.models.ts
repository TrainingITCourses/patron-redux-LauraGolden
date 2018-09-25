export interface Global {
    lanzamientos: any[];
    estados: any[];
    agencias: any[];
    misiones: any[];
  }

  export const globalInitialState: Global = {
    lanzamientos: [],
    estados: [],
    agencias: [],
    misiones: [],
  };

  export enum ModoBusqueda {
    Estado = 1,
    Agencia ,
    Tipo
  }
