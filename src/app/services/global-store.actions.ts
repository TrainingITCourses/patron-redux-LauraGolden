export enum GlobalActionTypes {
    CargaLanzamientos = '[Global] CargaLanzamientos',
    CargaEstados = '[Global] CargaEstados',
    CargaAgencias = '[Global] CargaAgencias',
    CargaMisiones = '[Global] CargaMisiones',
  }

export interface Action {
    readonly type: GlobalActionTypes;
    readonly payload: any;
 }

export class CargaLanzamientos implements Action {
    public readonly type = GlobalActionTypes.CargaLanzamientos;
    constructor(public readonly payload: any[]) {}
  }

export class CargaEstados implements Action {
    public readonly type = GlobalActionTypes.CargaEstados;
    constructor(public readonly payload: any[]) {}
  }

export class CargaAgencias implements Action {
    public readonly type = GlobalActionTypes.CargaAgencias;
    constructor(public readonly payload: any[]) {}
  }

export class CargaMisiones implements Action {
    public readonly type = GlobalActionTypes.CargaMisiones;
    constructor(public readonly payload: any[]) {}
  }

export type GlobalActions = CargaLanzamientos | CargaEstados | CargaAgencias | CargaMisiones;
