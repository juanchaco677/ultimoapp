import { Injectable } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ValerianConstante } from '../../util/valerianconstante';
import { Evento} from '../../modelo/evento';
/*
  Generated class for the EventoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventoProvider {
  ruta:string=ValerianConstante.URL+"api/usuario/";
  headers:Headers = new Headers;
  /**
   * 
   * @param http 
   */
  constructor(public http: Http) {

  }

  public getEventos(buscar:String,token:String,inicial:number):Observable <Evento[]>{
    console.log("BUSCAR dd="+buscar);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let parameter="buscar="+buscar;
        parameter+="&";
        parameter+="inicial="+inicial;

    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.ruta+"getEventos/?"+parameter,options)
    .map((res : Response) => res.json())

  }

       /**
   * metood para crear un usuario
   * la data es json o informaicon ingresada en el formulario
   * @param data 
   */
  public crear(data:any,token:string):Observable<any>{
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token); 
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.ruta+"storeEvento",data,options)
    .map((res : Response) => res.json())

  }
  413317339195259

}
