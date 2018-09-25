import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CargaLanzamientos, CargaSubCriterios } from './global-store.actions';
import { GlobalStore } from './global-store.state';

@Injectable()
export class ApiService {
  private key = 'launches';
  // public launches: any[];
  // public statuses: any[];

  constructor(private httpC: HttpClient, private global: GlobalStore) {
    // const localLanzamientos =  localStorage.getItem(this.key);
    // if (localLanzamientos) {
    //   this.global.dispatch(new CargaLanzamientos(JSON.parse(localLanzamientos)));
    // } else {
    //   this.getLaunches()
    //   // .subscribe((res: any[]) => this.launches = res);
    //   .subscribe(launches => {
    //     this.global.dispatch(new CargaLanzamientos(launches));
    //   });
    // }
  }

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

  public getAgencies = (): Observable<any[]> =>
    this.httpC
      .get('../../assets/launchagencies.json')
      .pipe(map((res: any) => res.agencies))

  public getMissionsTypes = (): Observable<any[]> =>
    this.httpC
      .get('../../assets/launchmissions.json')
      .pipe(map((res: any) => res.types))

  public getStatusTypes = (): Observable<any[]> =>
    this.httpC
      .get('../../assets/launchstatus.json')
      .pipe(map((res: any) => res.types))

  
}
