import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';

import { Evento} from '../../modelo/evento';
import { Imagen} from '../../modelo/imagen';
import { EventoProvider } from '../../providers/evento/evento';
import { Usuario} from '../../modelo/usuario';
import { EventoPage } from '../evento/evento';
import { CaeventoPage } from '../caevento/caevento';
import { EventousuariosPage } from '../eventousuarios/eventousuarios';

import { ValerianConstante } from '../../util/valerianconstante';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-listareventos',
  templateUrl: 'listareventos.html'
})
export class ListareventosPage {
  usuarioAuth:Usuario;
  listaEvento:Array<Evento> = [];
  listaImagen:Array<Imagen> = [];
  listaImagenEvento:Array<Imagen> = [];
  buscar:string;
  url:string;
  constructor(private loadingCtrl:LoadingController,private alertCtrl: AlertController,public redireccionar: NavController,private eventoProvider :EventoProvider ) {
    this.usuarioAuth=<Usuario>JSON.parse(localStorage.getItem('usuario')).usuario;
    this.url=ValerianConstante.URL;
  }

  getEventos(buscar:String,inicial:number){
    this.eventoProvider.getEventos(buscar,this.usuarioAuth.token,inicial).subscribe(
      data=>{               
          if(data["data"].length>0){
            let listaAuxEvento=<Evento[]>data["data"];
            let contador:number=0;
            for (var i=0 ;i <= listaAuxEvento.length ;i++) {              
                contador++;
                let evento=<Evento>listaAuxEvento[i];               
                let eventoAux=<Evento>listaAuxEvento[i+1];               
                if(contador==1){
                  if(!this.existeEvento(evento)){    
                    this.listaEvento.push(evento);   
                  }
                }else if(eventoAux !=undefined && evento.id!=eventoAux.id){
                  if(!this.existeEvento(eventoAux)){    
                   this.listaEvento.push(eventoAux);  
                  }

                }    
              }
                                    
            }                     
           
        },
      err=>{        
        console.log("ERROR");
        console.log(err["error"]);
      }
    );
  }
  existeEvento(evento:Evento){
    if(this.listaEvento.length > 0){
      for(var j=0; j < this.listaEvento.length;j++){
        let eventoAux=<Evento>this.listaEvento[j];
        if(eventoAux.id==evento.id){
          return true;
        }
      }
    }
    return false;
  }
 
  buscarEventos(evento:any){
    this.buscar = evento.target.value;
    if(this.buscar!="" && this.buscar!=" "){
      this.listaEvento= [];
      this.getEventos(this.buscar,0);
    }else{
      this.listaEvento= [];
    }
  }

  ver(evento:Evento){
    this.redireccionar.push(EventoPage,{evento:evento});
  }
  editar(evento:Evento){
    if(this.usuarioAuth.id==evento.id_creador){
      this.redireccionar.push(CaeventoPage,{evento:evento});
    }else{
      let alert = this.alertCtrl.create({
        title: 'Privilegios:',
        subTitle:"No tiene los suficientes privilegios para actualizar el Evento.",
        buttons: ['OK']
      });    
      alert.present();     
    }
  }

  agregarUsuario(evento:Evento){
    this.redireccionar.push(EventousuariosPage,{evento:evento});
  }

  eliminar(evento:Evento){
    if(this.usuarioAuth.id==evento.id_creador){
      let alert = this.alertCtrl.create({
        title: 'Acción en proceso.',
        message: 'Esta Seguro De Eliminar El Evento.?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              let loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Cargando...'
              });  
              loading.present();
              this.eventoProvider.deleteEvento({id:evento.id},this.usuarioAuth.token).subscribe(
                data=>{             
                  loading.dismiss();      
                this.redireccionar.push(MenuPage);       
                },
                err=>{
                  loading.dismiss();
                  let alert = this.alertCtrl.create({
                    title: 'Error al eliminar el evento.',
                    subTitle: JSON.parse(err["_body"]).error,
                    buttons: ['OK']
                  });    
                  alert.present();       
          
              });
            }
          }
        ]
      });
      alert.present();
    }else{
      let alert = this.alertCtrl.create({
        title: 'Privilegios:',
        subTitle:"No tiene los suficientes privilegios para actualizar el Evento.",
        buttons: ['OK']
      });    
      alert.present();     
    }
  }

  /**
   * 
   * @param id_evento busca las imagenes de un evento
   */
  buscarImagenPrimera(id_evento:string):Imagen{
    
    for (var i in this.listaImagen) {
      if(this.listaImagen[i].id_evento==id_evento){
        return this.listaImagen[i];
      }
    }
   return undefined;
  }

  doRefresh(refresher) {
      this.getEventos(this.buscar,this.listaEvento.length-1);
      refresher.complete();
  }

  irCAenvento(params){
    if (!params) params = {};
    this.redireccionar.push(CaeventoPage);
  }
  
}
