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
    case GlobalActionTypes.CargaSubCriterios:
      result.subCriterios = action.payload;
      break;
  }
  return result;
}
