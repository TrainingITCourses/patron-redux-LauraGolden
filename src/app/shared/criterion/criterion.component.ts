import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModoBusqueda } from './criterion-modo';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.css']
})
export class CriterionComponent implements OnInit {
  @Input() public valoresC: any[];
  @Output() public criterioSeleccionado = new EventEmitter<number>();
  @Output() public subCriterioSeleccionado = new EventEmitter<string>();

  textoSeleccion: string;

  constructor() { }

  ngOnInit() {
    console.log('Criterion_ngOnInit');
  }

  selCriterio($event) {
    const modo: ModoBusqueda = Number($event.srcElement.value);
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
