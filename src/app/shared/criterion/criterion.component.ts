import { ModoBusqueda } from '../../services/models/global.models';
import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.css']
})
export class CriterionComponent implements OnInit {
  @Input() public subCriterios: any[];
  @Input() public seleccionado = 0;
  @Input() public seleccionadoSubC = -1;
  @Output() public criterioSeleccionado = new EventEmitter<number>();
  @Output() public subCriterioSeleccionado = new EventEmitter<string>();

  textoSeleccion: string;
  constructor() { }

  ngOnInit() {
    // this.seleccionado = 0;
    console.log('Criterion_ngOnInit');
  }

  selCriterio($event) {
    let modo: number;
    modo = parseInt($event.srcElement.value)

    switch (modo) {
    case 1:
      this.textoSeleccion = 'un estado';
      break;
    case 2:
      this.textoSeleccion = 'una agencia';
      break;
    case 3:
      this.textoSeleccion = 'un tipo de misión';
      break;
    }
    this.criterioSeleccionado.next(modo);
  }

  selSubCriterio($event) {
    this.subCriterioSeleccionado.next($event.srcElement.value);
  }
}
