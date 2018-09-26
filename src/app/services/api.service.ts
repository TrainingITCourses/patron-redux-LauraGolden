import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CargaLanzamientos, CargaEstados, CargaAgencias, CargaMisiones } from './global-store.actions';
import { GlobalStore } from './global-store.state';

@Injectable()
export class ApiService {
  private key = 'launches';
  constructor(private httpC: HttpClient, private global: GlobalStore) { }

  public getLaunches = () => {
    const localLaunches = localStorage.getItem(this.key);
    if (localLaunches) {
      this.global.dispatch(new CargaLanzamientos(JSON.parse(localLaunches)));
    } else {
      this.httpC
        .get('../../assets/launchlibrary.json')
        .pipe(map((res: any) => res.launches))
        .subscribe(launches => {
          localStorage.setItem(this.key, JSON.stringify(launches));
          this.global.dispatch(new CargaLanzamientos(launches));
        });
    }
  }

  public getAgencies = () =>
    this.httpC
      .get('../../assets/launchagencies.json')
      .pipe(map((res: any) => res.agencies))
      .subscribe(agencies => this.global.dispatch(new CargaAgencias(agencies)))

  public getMissionsTypes = () =>
    this.httpC
      .get('../../assets/launchmissions.json')
      .pipe(map((res: any) => res.types))
      .subscribe(missions => this.global.dispatch(new CargaMisiones(missions)))

  public getStatusTypes = () => {
    this.httpC
      .get('../../assets/launchstatus.json')
      .pipe(map((res: any) => res.types))
      .subscribe(statuses => this.global.dispatch(new CargaEstados(statuses)));
  }
}
