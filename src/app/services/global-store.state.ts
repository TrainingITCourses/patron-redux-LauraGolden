import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Global, globalInitialState } from './models/global.models';
import { GlobalActions, GlobalActionTypes } from './global-store.actions';
import { globalStoreReducer } from './global-store.reducer';

export enum GlobalSlideTypes {
  lanzamientos = 'lanzamientos',
  estados = 'estados',
  agencias = 'agencias',
  misiones = 'misiones',
  criterios = 'criterios',
  valores = 'valores',
}

@Injectable({
  providedIn: 'root'
})
export class GlobalStore {
  private state: Global = {...globalInitialState};

  private lanzamientos$ = new BehaviorSubject<any>(this.state.lanzamientos);
  private estados$ = new BehaviorSubject<any>(this.state.estados);
  private agencias$ = new BehaviorSubject<any>(this.state.agencias);
  private misiones$ = new BehaviorSubject<any>(this.state.misiones);
  private criterios$ = new BehaviorSubject<any>(this.state.criterios);
  private valores$ = new BehaviorSubject<any>(this.state.valores);
  constructor() { }


  public dispatch = (action: GlobalActions) => {
    console.log('dispatching...', action);
    this.state = globalStoreReducer(this.state, action);
    switch (action.type) {
      case GlobalActionTypes.CargaLanzamientos:
        this.lanzamientos$.next([...this.state.lanzamientos]);
        break;
      case GlobalActionTypes.CargaEstados:
        this.valores$.next([...this.state.estados]);
        break;
      case GlobalActionTypes.CargaAgencias:
        this.valores$.next([...this.state.agencias]);
        break;
      case GlobalActionTypes.CargaMisiones:
        this.valores$.next([...this.state.misiones]);
        break;
      case GlobalActionTypes.CargaValores:
        this.valores$.next([...this.state.valores]);
        break;
    }
  };

  public getSnapShot = (slice: GlobalSlideTypes) => {
    switch (slice) {
      case GlobalSlideTypes.lanzamientos:
        return [...this.state.lanzamientos];
      case GlobalSlideTypes.estados:
        return [...this.state.estados];
      case GlobalSlideTypes.agencias:
        return [...this.state.agencias];
      case GlobalSlideTypes.misiones:
        return [...this.state.misiones];
      case GlobalSlideTypes.criterios:
        return [...this.state.criterios];
      case GlobalSlideTypes.valores:
        return [...this.state.valores];
    }
  };

  public select$ = (slice: GlobalSlideTypes) => {
    switch (slice) {
      case GlobalSlideTypes.lanzamientos:
        return this.lanzamientos$.asObservable();
      case GlobalSlideTypes.estados:
        return this.estados$.asObservable();
      case GlobalSlideTypes.agencias:
        return this.agencias$.asObservable();
      case GlobalSlideTypes.misiones:
        return this.misiones$.asObservable();
      case GlobalSlideTypes.criterios:
        return this.criterios$.asObservable();
      case GlobalSlideTypes.valores:
        return this.valores$.asObservable();
    }
  };

}
