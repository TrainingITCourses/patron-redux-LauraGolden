import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Global, globalInitialState } from './models/global.models';
import { GlobalActions, GlobalActionTypes } from './global-store.actions';
import { globalStoreReducer } from './global-store.reducer';

export enum GlobalSlideTypes {
  lanzamientos = 'lanzamientos',
  subCriterios = 'subCriterios',
}

@Injectable({
  providedIn: 'root'
})
export class GlobalStore {
  private state: Global = {...globalInitialState};
  private lanzamientos$ = new BehaviorSubject<any>(this.state.lanzamientos);
  private subCriterios$ = new BehaviorSubject<any>(this.state.subCriterios);
  constructor() { }


  public dispatch = (action: GlobalActions) => {
    console.log('dispatching...', action);
    this.state = globalStoreReducer(this.state, action);
    switch (action.type) {
      case GlobalActionTypes.CargaLanzamientos:
        this.lanzamientos$.next([...this.state.lanzamientos]);
        break;
      case GlobalActionTypes.CargaSubCriterios:
        this.subCriterios$.next([...this.state.subCriterios]);
        break;
    }
  };

  public selectSnapShot = (slice: GlobalSlideTypes) => {
    switch (slice) {
      case GlobalSlideTypes.lanzamientos:
        return [...this.state.lanzamientos];
      case GlobalSlideTypes.subCriterios:
        return [...this.state.subCriterios];
    }
  };

  public select$ = (slice: GlobalSlideTypes) => {
    switch (slice) {
      case GlobalSlideTypes.lanzamientos:
        return this.lanzamientos$.asObservable();
      case GlobalSlideTypes.subCriterios:
        return this.subCriterios$.asObservable();
    }
  };

}
