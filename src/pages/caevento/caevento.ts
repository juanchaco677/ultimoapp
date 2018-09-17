import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController ,NavParams} from 'ionic-angular';
import { Evento} from '../../modelo/evento';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Usuario} from '../../modelo/usuario';
import { Imagen} from '../../modelo/imagen';
import { ImagenesProvider } from '../../providers/imagenes/imagenes';
import { EventoProvider } from '../../providers/evento/evento';
import { ValerianConstante } from '../../util/valerianconstante';
import { MenuPage } from '../menu/menu';
@Component({
  selector: 'page-caevento',
  templateUrl: 'caevento.html'
})
export class CaeventoPage {
  evento:Evento;
  usuarioAuth:Usuario;
  imagenes:Array<string>=[];
  imagenesTabla:Array<Imagen> = [];
  imagenesTablaEliminar:Array<Imagen> = [];
  url:string;
  crearactualizar:boolean=false;
  constructor(private imagenesProvider:ImagenesProvider,private alertCtrl: AlertController,public parametros: NavParams,private loadingCtrl:LoadingController,public redireccionar: NavController,private camera: Camera,private eventoProvider:EventoProvider) {
    this.usuarioAuth=<Usuario>JSON.parse(localStorage.getItem('usuario')).usuario;
    this.evento=<Evento>this.parametros.get("evento");
    if(this.evento==undefined){
      this.evento=new Evento("","","","","","","",null,null);
      this.crearactualizar=true;
    }
    this.url=ValerianConstante.URL;
    this.getImagenes();
  }

  getImagenes(){
    if(this.evento!=null && this.evento!=undefined){
      this.imagenesProvider.getImagenesFoto(this.evento.id,this.usuarioAuth.token).subscribe(
        data=>{               
            this.imagenesTabla=<Imagen[]>data["imagenesTabla"];
          },
        err=>{        
          console.log("ERROR");
          console.log(err);
        }
      );
    }
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
  eliminarImagenTabla(j){
    this.imagenesTablaEliminar.push(this.imagenesTabla[j]);
    this.imagenesTabla.splice(j,1);
  }
  crear(formulario){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Cargando...'
    });  
    loading.present();
    formulario.value.type="E";
    formulario.value.id_creador=this.usuarioAuth.id;
    
    if(this.crearactualizar){
      //crear el evento
      if(this.imagenes.length > 0){
        formulario.value.imagenes=this.imagenes;
      }

        this.eventoProvider.crear(formulario.value,this.usuarioAuth.token).subscribe(
          data=>{        
            loading.dismiss();  
            this.evento=new Evento("","","","","","","",null,null);    
            this.imagenes=[];
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
      }else{
        //actualizar el evento
        if(this.imagenes.length > 0){
          formulario.value.imagenes=this.imagenes;
        }
        if(this.imagenesTablaEliminar.length > 0){
          formulario.value.imagenestabla=this.imagenesTablaEliminar;
        }
        formulario.value.id=this.evento.id;
          this.imagenesProvider.crearEliminar(formulario.value,this.usuarioAuth.token).subscribe(
            data=>{        
                this.imagenesTablaEliminar=[];
                loading.dismiss();
                let success:boolean=data["success"];
                if(success){         
                  this.getImagenes();  
                  this.imagenes=[];
                  this.imagenesTabla= [];
                  let alert = this.alertCtrl.create({
                    title: "Se actualizo correctamente el evento.",
                    subTitle: data["data"],
                    buttons: ['OK']
                  });    
              
                  alert.present();
                }else{
                  let alert = this.alertCtrl.create({
                    title: "Eliminar",
                    subTitle: "El evento se elimino correctamente.",
                    buttons: ['OK']
                  });    
              
                  alert.present();  
                  this.redireccionar.push(MenuPage);
                }     
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
}
