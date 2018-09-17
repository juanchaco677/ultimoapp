import { Usuario} from '../modelo/usuario';
import { Publicacion} from '../modelo/publicacion';
export class ValerianConstante {
  
  // http://localhost:8000/
  //http://181.61.152.40/
  public static URL:string="http://190.8.248.12/";

  public static concatenar(cadena:string){
    return ValerianConstante.esVacio(cadena)?"":cadena;
  } 

  public static esVacio(cadena):boolean{
      return (cadena==null || cadena=="" || cadena==undefined || cadena=="null");
  }

  public static getNombreCompleto(usuario:Usuario):any{  

    return  usuario.name+" "+(ValerianConstante.esVacio(usuario.name2)?"":usuario.name2)+" "+(ValerianConstante.esVacio(usuario.lastname)?"":usuario.lastname)+" "+(ValerianConstante.esVacio(usuario.lastname2)?"":usuario.lastname2);
  }

  public static getNombreCompletoPublicacion(publicacion:Publicacion){
    return  publicacion.name+" "+(ValerianConstante.esVacio(publicacion.name2)?"":publicacion.name2)+" "+(ValerianConstante.esVacio(publicacion.lastname)?"":publicacion.lastname)+" "+(ValerianConstante.esVacio(publicacion.lastname2)?"":publicacion.lastname2);
   }

  public static getFecha(todayTime:Date) {
    var todayTime = new Date();
    var month = todayTime .getMonth() + 1;
    var day = todayTime .getDate();
    var year =todayTime .getFullYear();
    return month + "/" + day + "/" + year;
  }
  public static getDias(fechaActual:Date,fechaAnterior:Date){
    var dif = fechaActual.getTime() - fechaAnterior.getTime();
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
  }
  public static getHora(todayTime:Date) {
    var todayTime = new Date();
    var horas = todayTime .getHours();
    var minutos = todayTime .getMinutes();
    var segundos =todayTime .getSeconds();
    return horas + ":" + minutos + ":" + segundos;
  }
}
