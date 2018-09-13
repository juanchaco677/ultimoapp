import { Injectable } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ValerianConstante } from '../../util/valerianconstante';
import { Usuario} from '../../modelo/usuario';
/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  ruta:string=ValerianConstante.URL+"api/usuario/";
  headers:Headers = new Headers;
  /**
   * 
   * @param http 
   */
  constructor(public http: Http) {

  }
  /**
   * metodo para iniciar sesion
   * parametro que tiene el json con los datos de envio
   * @param data 
   */
  public iniciarSesion(data:Object):Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.ruta+"sesion",data,options)
    .map((res : Response) => res.json())

  }
  /**
   * metood para crear un usuario
   * la data es json o informaicon ingresada en el formulario
   * @param data 
   */
  public crear(data):Observable<any>{
  
    return this.http.post(this.ruta+"crear",data)
    .map((res : Response) => res.json())

  }
   /**
   * metood para crear un usuario
   * la data es json o informaicon ingresada en el formulario
   * @param data 
   */
  public crearAndroid(data:any,token:string):Observable<any>{
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token); 
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.ruta+"storeAndroid",data,options)
    .map((res : Response) => res.json())

  }

     /**
   * metood para crear un usuario
   * la data es json o informaicon ingresada en el formulario
   * @param data 
   */
  public crearAndroidEvento(data:any,token:string):Observable<any>{
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token); 
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.ruta+"storeAndroidEvento",data,options)
    .map((res : Response) => res.json())

  }

  
    /**
   * metood para crear un usuario
   * la data es json o informaicon ingresada en el formulario
   * @param data 
   */
  public actualizarAndroid(data:any,token:string):Observable<any>{
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token); 
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.ruta+"updateAndroid",data,options)
    .map((res : Response) => res.json())

  }

  

  /**
   * metood para crear un usuario
   * la data es json o informaicon ingresada en el formulario
   * @param data 
   */
  public crearAndroidVisitante(data:any):Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.ruta+"storeAndroidVisitante",data,options)
    .map((res : Response) => res.json())

  }

  

  public getUsuario(data:Object):Observable<any>{
    
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + data); 

    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.ruta+"getUsuario",options)
    .map((res : Response) => res.json())

  }

  public getReferidos(buscar:String,token:String,id_candidato:any,id:any):Observable <Usuario[]>{

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let parameter="id="+id;
        parameter+="&";
        parameter+="id_candidato="+id_candidato;
        parameter+="&";
        parameter+="buscar="+buscar;

    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.ruta+"getReferidos/?"+parameter,options)
    .map((res : Response) => res.json())

  }

  public getUsuarioSms(buscar:String,token:String,id_candidato:any,id:any):Observable <Usuario[]>{

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let parameter="id="+id;
        parameter+="&";
        parameter+="id_candidato="+id_candidato;
        parameter+="&";
        parameter+="buscar="+buscar;

    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.ruta+"getUsuarioSms/?"+parameter,options)
    .map((res : Response) => res.json())

  }

  public envioSms(data:any,token:string):Observable<any>{
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token); 
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.ruta+"envioSms",data,options)
    .map((res : Response) => res.json())

  }


}
