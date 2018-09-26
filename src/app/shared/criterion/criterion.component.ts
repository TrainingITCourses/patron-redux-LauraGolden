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
  @Input() public seleccionadoSubC = 0;
  @Output() public criterioSeleccionado = new EventEmitter<number>();
  @Output() public subCriterioSeleccionado = new EventEmitter<string>();
  // private _seleccionadoSubC = '';

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
    // this._seleccionadoSubC = '';
    this.criterioSeleccionado.next(modo);
    // this.subCriterios = [];
  }

  selSubCriterio($event) {
    this.subCriterioSeleccionado.next($event.srcElement.value);
  }

  // get seleccionadoSubC() {
  //   return this._seleccionadoSubC;
  // }
  // set seleccionadoSubC(value) {
  //     this._seleccionadoSubC = value;
  //     this.selSubCriterio(value);
  // }
}
