export interface Global {
    lanzamientos: any[];
    estados: any[];
    agencias: any[];
    misiones: any[];
    valores: any[];
    numLanzamientos: number;
  }

  export const globalInitialState: Global = {
    lanzamientos: [],
    estados: [],
    agencias: [],
    misiones: [],
    valores: [],
    numLanzamientos: 0,
  };
