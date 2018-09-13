import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController,NavParams } from 'ionic-angular';
import { Usuario} from '../../modelo/usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Evento} from '../../modelo/evento';
import { ValerianConstante } from '../../util/valerianconstante';
@Component({
  selector: 'page-eventousuarios',
  templateUrl: 'eventousuarios.html'
})
export class EventousuariosPage {

  usuario=new Usuario("","","","","","","","","","","","","","",null,null);
  usuarioAuth:Usuario;
  listaUsuario:Observable<Usuario[]>;
  evento:Evento;
  constructor(public parametros:NavParams,private alertCtrl: AlertController,private loadingCtrl:LoadingController,public navCtrl: NavController,private usuarioProvider:UsuarioProvider) {
    this.usuarioAuth=<Usuario>JSON.parse(localStorage.getItem('usuario')).usuario;
    this.evento=<Evento>this.parametros.get("evento");
  }

  buscarReferido(evento:any){
    let buscar = evento.target.value; 
   
    let id_candidato=this.usuarioAuth.id_candidato == null || this.usuarioAuth.id_candidato == undefined || this.usuarioAuth.id_candidato == "" ?this.usuarioAuth.id:this.usuarioAuth.id_candidato;
    this.usuarioProvider.getReferidos(buscar,this.usuarioAuth.token,id_candidato,this.usuarioAuth.id).subscribe(
      data=>{               
            this.listaUsuario=<Observable<Usuario[]>>data["data"];       
        },
      err=>{        
        console.log("ERROR");
          console.log(err);
      }
    );
  }

  crear(formulario){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Cargando...'
    });  
    loading.present();
    if(formulario.value.name.length > 0 && formulario.value.name!="" && formulario.value.name!=undefined && formulario.value.name!=null){
      let nombres:string[]=formulario.value.name.split(" ");
      formulario.value.nombre=this.recursivo(nombres,0);
      formulario.value.nombre2=this.recursivo(nombres,1);
      formulario.value.apellido=this.recursivo(nombres,2);
      formulario.value.apellido2=this.recursivo(nombres,3);
    }else{
      formulario.value.nombre="ANONIMO";
      formulario.value.nombre2="ANONIMO";
      formulario.value.apellido="ANONIMO";
      formulario.value.apellido2="ANONIMO";
    }
  
    formulario.value.type="E";
    formulario.value.id_referido=formulario.value.id_referido=="" || formulario.value.id_referido==undefined?this.usuarioAuth.id:formulario.value.id_referido;
    formulario.value.id_evento=this.evento.id;
    this.usuarioProvider.crearAndroidEvento(formulario.value,this.usuarioAuth.token).subscribe(
      data=>{ 
          this.usuario=new Usuario("","","","","","","","","","","","","","",null,null);          
          let nombreCompleto:string=ValerianConstante.getNombreCompleto(<Usuario>data["usuario"]);        
          loading.dismiss();       
          let alert = this.alertCtrl.create({
            title: 'El usuario se registro correctamente.',
            subTitle: nombreCompleto+", "+data["data"],
            buttons: ['OK']
          });    
          alert.present(); 
        },
      err=>{        
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error al registrar el usuario en el evento:'+this.evento.titulo,
          subTitle: JSON.parse(err["_body"]).data,
          buttons: ['OK']
        });    
        alert.present();   
      }
    );
  }
  
  recursivo(arrayNombre:string[],i:number):String{

		if(arrayNombre[i]!="" && arrayNombre[i]!=null && arrayNombre[i]!=undefined){
			return arrayNombre[i];
		}else if(arrayNombre[i]==undefined){
			return "";
		}		

		return this.recursivo(arrayNombre,i+1);
	}

}
