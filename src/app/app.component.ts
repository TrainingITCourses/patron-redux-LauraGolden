import { Component, ChangeDetectionStrategy} from '@angular/core';

export enum ModoBusqueda {
  Estado = 1,
  Agencia ,
  Tipo
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Buscador lanzamientos';
}
