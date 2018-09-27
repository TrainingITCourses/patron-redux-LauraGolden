import { GlobalActions, GlobalActionTypes } from './global-store.actions';
import { Global, globalInitialState } from './models/global.models';

export function globalStoreReducer(
  state = globalInitialState,
  action: GlobalActions
): Global {
  const result = { ...state };
  switch (action.type) {
    case GlobalActionTypes.CargaLanzamientos:
      result.lanzamientos = action.payload;
      break;
    case GlobalActionTypes.CargaEstados:
      result.estados = action.payload;
      break;
    case GlobalActionTypes.CargaAgencias:
      result.agencias = action.payload;
      break;
    case GlobalActionTypes.CargaMisiones:
      result.misiones = action.payload;
      break;
    case GlobalActionTypes.CargaCriterios:
      result.criterios = action.payload;
      break;
    case GlobalActionTypes.CargaValores:
      result.valores = action.payload;
      break;
  }
  return result;
}
