export enum GlobalActionTypes {
    CargaLanzamientos = '[Global] CargaLanzamientos',
    CargaSubCriterios = '[Global] CargaSubCriterios',
  }

export interface Action {
    readonly type: GlobalActionTypes;
    readonly payload: any;
 }

export class CargaLanzamientos implements Action {
    public readonly type = GlobalActionTypes.CargaLanzamientos;
    constructor(public readonly payload: any[]) {}
  }

export class CargaSubCriterios implements Action {
    public readonly type = GlobalActionTypes.CargaSubCriterios;
    constructor(public readonly payload: any[]) {}
  }

export type GlobalActions = CargaLanzamientos | CargaSubCriterios;
