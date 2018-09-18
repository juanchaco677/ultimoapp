import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Usuario} from '../../modelo/usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import {MenuPage} from '../menu/menu';
import {LoadingController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {LoginvisitantePage} from '../loginvisitante/loginvisitante';
import { ValerianConstante } from '../../util/valerianconstante';
@Component({
  selector: 'page-sesion',
  templateUrl: 'sesion.html'
})
export class SesionPage implements OnInit {
  usuario=new Usuario("","","","","","","","","","","","","","",null,null);
  usuarioAuth:Usuario;
  errores:Array<string>;
  constructor(private alertCtrl: AlertController,private loadingCtrl:LoadingController,public redireccionar: NavController,private usuarioProvider:UsuarioProvider) {
   if(localStorage.getItem('usuario') != undefined || localStorage.getItem('usuario') != null ){
       this.redireccionar.push(MenuPage,{visible:true});    
   }
      
  }
  ngOnInit() { 


  }
  goToRegistrarUsuario(params){
    if (!params) params = {};
    this.redireccionar.push(LoginvisitantePage);
  
  }

  iniciarSesion(formulario)
  {
   
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Cargando...'
    });  
    loading.present();
    this.usuarioProvider.iniciarSesion(formulario.value).subscribe(
      data=>{   

        this.getUsuario(data['token']);
        loading.dismiss();
      
      },
      err=>{
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error al Iniciar Sesión',
          subTitle: JSON.parse(err["_body"]).error,
          buttons: ['OK']
        });    
        alert.present();       

    });
  }
  

  getUsuario(token:string):void{

    this.usuarioProvider.getUsuario(token).subscribe(
         data=>{    
           console.log("obtener usuario");
           console.log(data["data"]);
              this.usuario=<Usuario>data["data"];                
              this.usuario.token=token;
              this.usuario.nombreCompleto=ValerianConstante.getNombreCompleto(this.usuario);
              localStorage.setItem('usuario',JSON.stringify({ usuario:this.usuario}));
              this.redireccionar.push(MenuPage,{visible:true});    
           },
         err=>{
            var respuesta=JSON.parse(err._body).error;
            for (const key in respuesta) {
              for (const key1 in respuesta[key]) {     
                let alert = this.alertCtrl.create({
                  title: 'Eror en algunos campos',
                  subTitle: respuesta[key][key1],
                  buttons: ['OK']
                });    
                alert.present();                    
              }             
            }   
        }
     );
 }
}
