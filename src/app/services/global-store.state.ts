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
  constructor() { }


  public dispatch = (action: GlobalActions) => {
    console.log('dispatching...', action);
    this.state = globalStoreReducer(this.state, action);
    switch (action.type) {
      case GlobalActionTypes.CargaLanzamientos:
        this.lanzamientos$.next([...this.state.lanzamientos]);
        break;
      case GlobalActionTypes.CargaEstados:
        this.estados$.next([...this.state.estados]);
        break;
      case GlobalActionTypes.CargaAgencias:
        this.agencias$.next([...this.state.agencias]);
        break;
      case GlobalActionTypes.CargaMisiones:
        this.misiones$.next([...this.state.misiones]);
        break;
    }
  };

  // esto en principio no hace falta porque ya se le pasa en el dispacth
  // public getSnapShot = (slice: GlobalSlideTypes) => {
  //   switch (slice) {
  //     case GlobalSlideTypes.lanzamientos:
  //       return [...this.state.lanzamientos];
  //     case GlobalSlideTypes.estados:
  //       return [...this.state.estados];
  //     case GlobalSlideTypes.agencias:
  //       return [...this.state.agencias];
  //     case GlobalSlideTypes.misiones:
  //       return [...this.state.misiones];
  //   }
  // };

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
    }
  };

}
