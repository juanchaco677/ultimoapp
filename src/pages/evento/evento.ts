import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Evento} from '../../modelo/evento';
import { Imagen} from '../../modelo/imagen';
import { Usuario} from '../../modelo/usuario';

import { Publicacion} from '../../modelo/publicacion';
import { PublicacionProvider } from '../../providers/publicacion/publicacion';
import { ValerianConstante } from '../../util/valerianconstante';
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html'
})
export class EventoPage {
  comentar:String;
  usuarioAuth:Usuario;
  listaPublicacion:Array<Publicacion> = [];
  publicacion:Publicacion;
  listaImage:Array<Imagen> = [];
  evento:Evento;
  url:string;
  constructor(public navCtrl: NavController,public parametros: NavParams,private publicacionProvider:PublicacionProvider) {
    this.evento=<Evento>this.parametros.get("evento");
    this.url=ValerianConstante.URL;
    this.usuarioAuth=<Usuario>JSON.parse(localStorage.getItem('usuario')).usuario;
    if(this.evento!=null && this.evento!=undefined){
      this.publicacionProvider.getPublicaciones(this.evento.id,this.usuarioAuth.token).subscribe(
        data=>{               
            let listaAuxPublicacion=<Publicacion[]>data["data"];
            for (const key in listaAuxPublicacion) {
                this.publicacion=<Publicacion>listaAuxPublicacion[key];          
                this.addEvento(this.publicacion);              
            }
            this.listaImage=<Imagen[]>data["imagenes"]; 
          },
        err=>{        
          console.log("ERROR");
          console.log(err);
        }
      );
    }
  }
  addEvento(publicacion:Publicacion){

    this.publicacion=new Publicacion(
    publicacion.id,
    publicacion.id_evento,
    publicacion.id_comenta,
    publicacion.descripcion,
    publicacion.name,
    publicacion.name2,
    publicacion.lastname,
    publicacion.lastname2,
    publicacion.created_at,
    publicacion.updated_at);
    let calculoDias=ValerianConstante.getDias(new Date(),new Date(this.publicacion.created_at));  
    let diasHoras=calculoDias > 0?("Hace "+calculoDias+" "+ValerianConstante.getHora(new Date(this.publicacion.created_at))) :(""+ValerianConstante.getHora(new Date(this.publicacion.created_at)));  
    this.publicacion.diaHora =diasHoras;   
    this.publicacion.nombreCompleto=ValerianConstante.getNombreCompletoPublicacion(this.publicacion);
    this.listaPublicacion.push(this.publicacion);
    
  }
 
  crear(formulario){
    formulario.value.id_evento=this.evento.id;
    formulario.value.id_comenta=this.usuarioAuth.id;
      this.publicacionProvider.crear(formulario.value,this.usuarioAuth.token).subscribe(
        data=>{               
  
          let publicacion:Publicacion=<Publicacion>data["data"];  
          this.publicacion=new Publicacion(
            publicacion.id,
            publicacion.id_evento,
            publicacion.id_comenta,
            publicacion.descripcion,
            publicacion.name,
            publicacion.name2,
            publicacion.lastname,
            publicacion.lastname2,
            publicacion.created_at,
            publicacion.updated_at);
            let calculoDias=ValerianConstante.getDias(new Date(),new Date(this.publicacion.created_at));  
            let diasHoras=calculoDias > 0?("Hace "+calculoDias+" "+ValerianConstante.getHora(new Date(this.publicacion.created_at))) :(""+ValerianConstante.getHora(new Date(this.publicacion.created_at)));  
            this.publicacion.diaHora = diasHoras;  
            this.publicacion.nombreCompleto = ValerianConstante.getNombreCompleto(this.usuarioAuth);
          this.listaPublicacion.push(this.publicacion);
          },
        err=>{        
          console.log("ERROR");
          console.log(err);
        }
      );
  }
}
