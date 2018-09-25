import { Component, OnInit, Input} from '@angular/core';
import { ApiService } from '../services/api.service';
import { ModoBusqueda, Global } from '../services/models/global.models';
import { GlobalStore, GlobalSlideTypes } from '../services/global-store.state';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ApiService]
})
export class SearchComponent implements OnInit {
  public lanzamientos$: any[];
  public estados: any[];
  public agencias$: Observable<any>;
  public misiones$: Observable<any>;

  public lanFiltrados$: any[] = [];
  public a_subCriterios: any[] = [];
  public seleccionado: ModoBusqueda;
  private criterioActual: ModoBusqueda;

  constructor(private api: ApiService, private global: GlobalStore) { }
  @Input() public titulo: string;

  ngOnInit() {
    this.cargaData();
    this.cargaObservables();
    this.seleccionado = 0;
    console.log('Search_ngOnInit');
  }

  private cargaData() {
    this.api.getLaunches();
    this.api.getStatusTypes();
    this.api.getAgencies();
    this.api.getMissionsTypes();
  }

  private cargaObservables() {
    this.global
    .select$(GlobalSlideTypes.lanzamientos)
    .subscribe(l => (this.lanzamientos$ = l));

    this.global
    .select$(GlobalSlideTypes.estados)
    .subscribe(estados => (this.estados = estados));

    this.global
    .select$(GlobalSlideTypes.agencias)
    .subscribe(a => (this.agencias$ = a));

    this.global
    .select$(GlobalSlideTypes.misiones)
    .subscribe(a => (this.misiones$ = a));
  }

  onCriterioSeleccionado = (criterioSel: ModoBusqueda) => {
    console.log('criterio seleccionado: ' + criterioSel);
    this.criterioActual = criterioSel;
   switch (criterioSel) {
      case 1: // Estado
        // this.api
        // .getStatusTypes()
        // .subscribe((res: any[]) => this.a_subCriterios = res);
        // this.estados$.subscribe((res: any[]) => this.a_subCriterios = res);
        this.a_subCriterios = this.estados;
        break;
      case 2: // Agencia
        // this.api
        // .getAgencies()
        // .subscribe((res: any[]) => this.a_subCriterios = res);
        this.agencias$.subscribe((res: any[]) => this.a_subCriterios = res);
        break;
      case 3: // Tipo'
        // this.api
        // .getMissionsTypes()
        // .subscribe((res: any[]) => this.a_subCriterios = res);
        this.misiones$.subscribe((res: any[]) => this.a_subCriterios = res);
        break;
      default:
        this.a_subCriterios = [];
    }
    // this.lanzamientos$ = [];
  }

  onSubCriterioSeleccionado = (SubcriterioSel: any) => {
    console.log('Busqueda por criterio seleccionado: ' + SubcriterioSel);
    const search: number = parseInt(SubcriterioSel);
    switch (this.criterioActual) {
      case 1: // Estado
          const filtroEstado = this.lanzamientos$.filter(
            function (l) {
              let res: boolean;
              res = false;
              if (l.status !== undefined) {
                res = l.status === search;
             }
             return res;
            }
          );
          this.lanFiltrados$ = filtroEstado;
        break;
      case 2: // Agencia
        const filtroAgencia = this.lanzamientos$.filter(
            function (l) {
                let res: boolean;
                res = false;
                if (l.rocket !== undefined && l.rocket !== null) {
                  if (l.rocket.agencies !== undefined && l.rocket.agencies !== null) {
                    if (l.rocket.agencies !== undefined && l.rocket.agencies !== null) {}
                    if (l.rocket.agencies.length !== null && l.rocket.agencies.length !== undefined) {
                      if (l.rocket.agencies.length > 0) {
                        res = l.rocket.agencies[0].id === search;
                      }
                    }
                  }
                }
                return res;
            }
        );
        this.lanFiltrados$ = filtroAgencia;
        break;
      case 3: // Tipo'
        const filtroTipo = this.lanzamientos$.filter(
            function (l) {
                let res: boolean;
                res = false;
                if (l.missions !== undefined) {
                  if (l.missions.length > 0) {
                    res = l.missions[0].type === search;
                  }
               }
               return res;
            }
        );
        this.lanFiltrados$ = filtroTipo;
      break;
      default:
        this.lanFiltrados$ = this.lanFiltrados$;
    }
  }
}
