import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Evento} from '../../modelo/evento';
import { Imagen} from '../../modelo/imagen';
import { Usuario} from '../../modelo/usuario';

import { Publicacion} from '../../modelo/publicacion';
import { PublicacionProvider } from '../../providers/publicacion/publicacion';

@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html'
})
export class EventoPage {
  comentar:String;
  usuarioAuth:Usuario;
  listaPublicacion:Array<Publicacion> = [];
  listaImage:Array<Imagen> = [];
  evento:Evento;

  constructor(public navCtrl: NavController,public parametros: NavParams,private publicacionProvider:PublicacionProvider) {
    this.evento=<Evento>this.parametros.get("evento");
    this.usuarioAuth=<Usuario>JSON.parse(localStorage.getItem('usuario')).usuario;
    if(this.evento!=null && this.evento!=undefined){
      this.publicacionProvider.getPublicaciones(this.evento.id,this.usuarioAuth.token).subscribe(
        data=>{               
            let listaAuxPublicacion=<Publicacion[]>data["data"];
            for (const key in listaAuxPublicacion) {
                let publicacion=<Publicacion>listaAuxPublicacion[key];
                this.addEvento(publicacion);              
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

    if(this.listaPublicacion.length>0){
      for (const key in this.listaPublicacion) {
          let publicacionAnalizado=<Publicacion>this.listaPublicacion[key];
          if(publicacionAnalizado.id!=publicacion.id){
            this.listaPublicacion.push(publicacion);
            break;
          }                
      }
    }else{
      this.listaPublicacion.push(publicacion);
    }
    
  }
 
  crear(formulario){
    formulario.value.id_evento=this.evento.id;
    formulario.value.id_comenta=this.usuarioAuth.id;
      this.publicacionProvider.crear(formulario.value,this.usuarioAuth.token).subscribe(
        data=>{               
          this.listaPublicacion.push(<Publicacion>data["data"]);

          },
        err=>{        
          console.log("ERROR");
          console.log(err);
        }
      );
  }
}
