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
      this.global.dispatch(new CargaAgencias([...agencies]));
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
      this.global.dispatch(new CargaMisiones([...missions]));
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
      this.global.dispatch(new CargaEstados([...states]));
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
        res.launches.filter(lan => {
          switch (criterio) {
            case 1: // 'Estado':
              return this.filtraEstado(lan, Number(valor));
            case 2: // 'Agencia':
              return this.filtraAgencia(lan, Number(valor));
            case 3: // 'Tipo mision':
              return this.filtraMision(lan, Number(valor));
            default:
              return [];
          }
        })
      )
    ).subscribe((lanzamientos: any) => {
      this.global.dispatch(new CargaLanzamientos(lanzamientos));
    });
  }

  private filtraEstado(lanzamiento: any, valor: number): boolean {
    return (lanzamiento.status === valor);
  }
  private filtraAgencia(lanzamiento: any, valor: number): boolean {
      let res: boolean;
      res = false;
      if (lanzamiento.rocket !== undefined && lanzamiento.rocket !== null) {
        if (lanzamiento.rocket.agencies !== undefined && lanzamiento.rocket.agencies !== null) {
          if (lanzamiento.rocket.agencies !== undefined && lanzamiento.rocket.agencies !== null) {}
          if (lanzamiento.rocket.agencies.length !== null && lanzamiento.rocket.agencies.length !== undefined) {
            if (lanzamiento.rocket.agencies.length > 0) {
              res = lanzamiento.rocket.agencies[0].id === valor;
            }
          }
        }
      }
      return res;
  }
  private filtraMision(lanzamiento: any, valor: number): boolean {
      let res: boolean;
      res = false;
      if (lanzamiento.missions !== undefined) {
        if (lanzamiento.missions.length > 0) {
          res = lanzamiento.missions[0].type === valor;
        }
      }
      return res;
  }
}
