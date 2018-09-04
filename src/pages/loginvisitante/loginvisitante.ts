import { Component } from '@angular/core';
import { NavController ,AlertController,LoadingController,NavParams} from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import {MenuPage} from '../menu/menu';
import { Usuario} from '../../modelo/usuario';
@Component({
  selector: 'page-loginvisitante',
  templateUrl: 'loginvisitante.html'
})
export class LoginvisitantePage {
  usuario=new Usuario("","","","","","","","","","","","","","",null,null);
  constructor(public parametros:NavParams,private usuarioProvider:UsuarioProvider,private alertCtrl: AlertController,private loadingCtrl:LoadingController,public navCtrl: NavController) {
   
  }
  
  sesion(formulario){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Cargando...'
    });  
    loading.present();

      formulario.value.nombre="ANONIMO";
      formulario.value.nombre2="ANONIMO";
      formulario.value.apellido="ANONIMO";
      formulario.value.apellido2="ANONIMO";
    
    
    formulario.value.type="E";
    formulario.value.id_referido=null;
    formulario.value.email=null;
    this.usuarioProvider.crearAndroidVisitante(formulario.value).subscribe(
      data=>{ 
          loading.dismiss();   
          this.usuario=new Usuario("","","","","","","","","","","","","","",null,null);          
          localStorage.setItem('usuario',JSON.stringify({ usuario:<Usuario>data["data"]}));   
              
          this.navCtrl.push(MenuPage,{visible:false});
        },
      err=>{        
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error al registrar el usuario',
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
