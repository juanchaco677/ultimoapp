import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { Evento} from '../../modelo/evento';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Usuario} from '../../modelo/usuario';

import { EventoProvider } from '../../providers/evento/evento';
@Component({
  selector: 'page-caevento',
  templateUrl: 'caevento.html'
})
export class CaeventoPage {
  evento:Evento=new Evento("","","","","","null","null",null,null);
  usuarioAuth:Usuario;
  imagenes:Array<string>=[];
  constructor(private alertCtrl: AlertController,private loadingCtrl:LoadingController,public navCtrl: NavController,private camera: Camera,private eventoProvider:EventoProvider) {
    this.usuarioAuth=<Usuario>JSON.parse(localStorage.getItem('usuario')).usuario;
  }
  tomarFoto(){

    let options: CameraOptions = {
       destinationType: this.camera.DestinationType.DATA_URL,
       targetWidth: 1000,
       targetHeight: 1000,
       quality: 100
     }
     this.camera.getPicture( options )
     .then(imageData => {
       this.imagenes.push(`data:image/jpeg;base64,${imageData}`);

     })
     .catch(error =>{
       console.error( error );
     });

  }
  eliminarImagen(i){
    this.imagenes.splice(i,1);
  }
  crear(formulario){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Cargando...'
    });  
    loading.present();
    formulario.value.type="E";
    formulario.value.id_creador=this.usuarioAuth.id;
    if(this.imagenes.length > 0){
      formulario.value.imagenes=this.imagenes;
    }
      this.eventoProvider.crear(formulario.value,this.usuarioAuth.token).subscribe(
        data=>{        
          loading.dismiss();  
          this.evento=new Evento("","","","","","","",null,null);     
          let alert = this.alertCtrl.create({
            title: "Se registro correctamente el evento.",
            subTitle: data["data"],
            buttons: ['OK']
          });    
      
          alert.present();     
          },
        err=>{        
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Error al Iniciar Sesión',
            subTitle: JSON.parse(err["_body"]).error,
            buttons: ['OK']
          });    
          alert.present();     
        }
      );
  }
}
