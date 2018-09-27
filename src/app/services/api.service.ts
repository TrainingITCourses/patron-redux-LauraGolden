import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CargaLanzamientos, CargaEstados, CargaAgencias, CargaMisiones } from './global-store.actions';
import { GlobalStore, GlobalSlideTypes } from './global-store.state';
import { ModoBusqueda } from '../app.component';



@Injectable()
export class ApiService {
  private key = 'launches';
  constructor(private httpC: HttpClient, private global: GlobalStore) { }

  // public getLaunches = () => {
  //   const localLaunches = localStorage.getItem(this.key);
  //   if (localLaunches) {
  //     this.global.dispatch(new CargaLanzamientos(JSON.parse(localLaunches)));
  //   } else {
  //     this.httpC
  //       .get('../../assets/launchlibrary.json')
  //       .pipe(map((res: any) => res.launches))
  //       .subscribe(launches => {
  //         localStorage.setItem(this.key, JSON.stringify(launches));
  //         this.global.dispatch(new CargaLanzamientos(launches));
  //       });
  //   }
  // }

  
  public getAgencies () {
    let agencies = this.global.getSnapShot(GlobalSlideTypes.agencias);
    if (agencies.length > 0) {
      return [...agencies];
    } else {
      this.httpC
      .get('../../assets/launchagencies.json')
      .pipe(map((res: any) => res.agencies))
      .subscribe(a => this.global.dispatch(new CargaAgencias(a)));
      }
    }

  public getMissionsTypes () {
    let missions = this.global.getSnapShot(GlobalSlideTypes.misiones);
    if (missions.length > 0) {
      return [...missions];
    } else {
      this.httpC
      .get('../../assets/launchmissions.json')
      .pipe(map((res: any) => res.types))
      .subscribe(m => this.global.dispatch(new CargaMisiones(m)));
    }
  }

  public getStatusTypes() {
    let states = this.global.getSnapShot(GlobalSlideTypes.estados);
    if (states.length > 0) {
      return [...states];
    } else {
      this.httpC
      .get('../../assets/launchstatus.json')
      .pipe(map((res: any) => res.types))
      .subscribe(statuses => this.global.dispatch(new CargaEstados(statuses)));
    }
  }


  public getCriterio(criterio: ModoBusqueda) {
    switch (criterio) {
      case 1 : // 'Estado':
        this.getStatusTypes();
        break;
      case 2: // 'Agencia':
        this.getAgencies();
        break;
      case 3: // 'Tipo':
        this.getMissionsTypes();
        break;
    }
  }

  public getFilterLaunches(criterio: ModoBusqueda, valor) {
    // const localLaunches = localStorage.getItem(this.key);
    // if (localLaunches) {
    //   this.global.dispatch(new CargaLanzamientos(JSON.parse(localLaunches)));
    // } else {
    //   this.httpC
    //     .get('../../assets/launchlibrary.json')
    //     .pipe(map((res: any) => res.launches))
    //     .subscribe(launches => {
    //       localStorage.setItem(this.key, JSON.stringify(launches));
    //       this.global.dispatch(new CargaLanzamientos(launches));
    //     });
    // }

    this.httpC
    .get('../../assets/launchlibrary.json')
    .pipe(map((res: any) =>
        res.lanzamientos.filter(lan => {
          switch (criterio) {
            case 1: // 'Estado':
              // let res1: boolean;
              // res = false;
              // if (lan.status !== undefined) {
              //   return lan.status === valor;
              // }
              return this.filtraEstado(lan, Number(valor));
            case 2: // 'Estado':
              let res2: boolean;
              res = false;
              if (lan.rocket !== undefined && lan.rocket !== null) {
                if (lan.rocket.agencies !== undefined && lan.rocket.agencies !== null) {
                  if (lan.rocket.agencies !== undefined && lan.rocket.agencies !== null) {}
                  if (lan.rocket.agencies.length !== null && lan.rocket.agencies.length !== undefined) {
                    if (lan.rocket.agencies.length > 0) {
                      return lan.rocket.agencies[0].id === valor;
                    }
                  }
                }
              }
              break;
            case 3: // 'Tipo':
              let res3: boolean;
              res = false;
              if (lan.missions !== undefined) {
                if (lan.missions.length > 0) {
                  return lan.missions[0].type === valor;
                }
              }
              break;
          }
        })
      )
    ).subscribe((lanzamientos: any) => {
      this.global.dispatch(new CargaLanzamientos(lanzamientos));
    });
  }

  private filtraEstado(lanzamiento: any, valor: number): boolean {
    return lanzamiento.status === valor;
  }
}
