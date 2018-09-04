import { Usuario} from '../modelo/usuario';
import { Publicacion} from '../modelo/publicacion';
export class ValerianConstante {
  public static URL:string="http://localhost:8000/";

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
}
