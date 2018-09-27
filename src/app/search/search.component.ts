import { Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Global } from '../services/models/global.models';
import { GlobalStore, GlobalSlideTypes } from '../services/global-store.state';
import { Observable } from 'rxjs';
import { ModoBusqueda } from '../app.component';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ApiService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  public lanFiltrados$: Observable<any>;
  public criterios$: Observable<any>;
  public valores$: Observable<any>;

  // public estados: any;
  // public agencias: any;
  // public misiones: any;

  // public lanFiltrados: any[] = [];
  public a_subCriterios: any[] = [];
  public seleccionado: ModoBusqueda;
  public a_seleccionadoSubC: any;
  private criterioActual: ModoBusqueda;

  constructor(private api: ApiService, private global: GlobalStore) { }
  @Input() public titulo: string;

  ngOnInit() {
    this.cargaObservables();

    this.seleccionado = 0;
    console.log('Search_ngOnInit');
  }

  private cargaObservables() {
    // this.global
    // .select$(GlobalSlideTypes.lanzamientos)
    // .subscribe(l => (this.lanzamientos = l));
    this.valores$ = this.global.select$(GlobalSlideTypes.valores);
    this.lanFiltrados$ = this.global.select$(GlobalSlideTypes.lanzamientos);
  }

  onCriterioSeleccionado (criterioSel: ModoBusqueda) {
    console.log('criterio seleccionado: ' + criterioSel);
    this.criterioActual = criterioSel;
    this.api.getCriterio(criterioSel);
    // unica forma que he encontrado para que se traslade el cambio al componente criterion y se limpie la lista de subcriterios
    if (this.a_seleccionadoSubC === -1) {
      this.a_seleccionadoSubC = undefined;
    } else {
      this.a_seleccionadoSubC = -1;
    }
  }

  onSubCriterioSeleccionado = (SubcriterioSel: any) => {
    console.log('Busqueda por criterio seleccionado: ' + SubcriterioSel);
    const busca: number = parseInt(SubcriterioSel);
    this.api.getFilterLaunches(this.criterioActual, busca);
    console.log(this.lanFiltrados$);
    // switch (this.criterioActual) {
    //   case 1: // Estado
    //       const filtroEstado = this.lanzamientos.filter(
    //         function (l) {
    //           let res: boolean;
    //           res = false;
    //           if (l.status !== undefined) {
    //             res = l.status === search;
    //          }
    //          return res;
    //         }
    //       );
    //       this.lanFiltrados = filtroEstado;
    //     break;
    //   case 2: // Agencia
    //     const filtroAgencia = this.lanzamientos.filter(
    //         function (l) {
    //             let res: boolean;
    //             res = false;
    //             if (l.rocket !== undefined && l.rocket !== null) {
    //               if (l.rocket.agencies !== undefined && l.rocket.agencies !== null) {
    //                 if (l.rocket.agencies !== undefined && l.rocket.agencies !== null) {}
    //                 if (l.rocket.agencies.length !== null && l.rocket.agencies.length !== undefined) {
    //                   if (l.rocket.agencies.length > 0) {
    //                     res = l.rocket.agencies[0].id === search;
    //                   }
    //                 }
    //               }
    //             }
    //             return res;
    //         }
    //     );
    //     this.lanFiltrados = filtroAgencia;
    //     break;
    //   case 3: // Tipo'
    //     const filtroTipo = this.lanzamientos.filter(
    //         function (l) {
    //             let res: boolean;
    //             res = false;
    //             if (l.missions !== undefined) {
    //               if (l.missions.length > 0) {
    //                 res = l.missions[0].type === search;
    //               }
    //            }
    //            return res;
    //         }
    //     );
    //     this.lanFiltrados = filtroTipo;
    //   break;
    //   default:
    //     this.lanFiltrados = [];
    //     this.a_seleccionadoSubC = -1;
    // }
  }
}
