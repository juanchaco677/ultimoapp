import { Injectable } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ValerianConstante } from '../../util/valerianconstante';
import { Publicacion} from '../../modelo/publicacion';
/*
  Generated class for the PublicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PublicacionProvider {

  ruta:string=ValerianConstante.URL+"api/usuario/";
  headers:Headers = new Headers;
  /**
   * 
   * @param http 
   */
  constructor(public http: Http) {

  }

  getPublicaciones(id_evento:string,token:String):Observable <any[]>{
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let parameter="id_evento="+id_evento;
    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.ruta+"getPublicaciones/?"+parameter,options)
    .map((res : Response) => res.json())
  }

     /**
   * metood para crear un usuario
   * la data es json o informaicon ingresada en el formulario
   * @param data 
   */
  public crear(data:any,token:string):Observable<Publicacion>{
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token); 
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.ruta+"storePublicacion",data,options)
    .map((res : Response) => res.json())

  }


}
