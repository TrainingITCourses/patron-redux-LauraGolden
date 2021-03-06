import { Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import { ApiService } from '../services/api.service';
import { GlobalStore, GlobalSlideTypes } from '../services/global-store.state';
import { Observable } from 'rxjs';
import { ModoBusqueda } from '../shared/criterion/criterion-modo';

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
  public seleccionado: ModoBusqueda;
  private criterioActual: ModoBusqueda;

  constructor(private api: ApiService, private global: GlobalStore) { }
  @Input() public titulo: string;

  ngOnInit() {
    this.cargaObservables();
    console.log('Search_ngOnInit');
  }

  private cargaObservables() {
    this.valores$ = this.global.select$(GlobalSlideTypes.valores);
    this.lanFiltrados$ = this.global.select$(GlobalSlideTypes.lanzamientos);
  }

  onCriterioSeleccionado (criterioSel: ModoBusqueda) {
    console.log('criterio seleccionado: ' + criterioSel);

    this.criterioActual = criterioSel;
    this.api.getCriteria(criterioSel);
  }

  onSubCriterioSeleccionado = (SubcriterioSel: Number) => {
    console.log('Busqueda por criterio seleccionado: ' + SubcriterioSel);
    // Duda: por mucho que reciba un parámetro de tipo Number, me llega siempre un string,
    // ¿da igual qué tipo se ponga para recibir el parámetro?
    const busca: number = Number(SubcriterioSel);
    this.api.getFilterLaunches(this.criterioActual, busca);
  }
}
