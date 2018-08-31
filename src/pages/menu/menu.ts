import { Component, ViewChild,OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CrearusuarioPage } from '../../pages/crearusuario/crearusuario';
import { SesionPage } from '../../pages/sesion/sesion';
import { ListareventosPage } from '../../pages/listareventos/listareventos';
import { Usuario} from '../../modelo/usuario';
import { PerfilPage } from '../../pages/perfil/perfil';


/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage implements OnInit {

  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = PerfilPage;
  
    usuarioAuth:Usuario=<Usuario>JSON.parse(localStorage.getItem('usuario')).usuario; 
    visible:boolean=true;
  ngOnInit() {
    console.log("ciclo devida");

    console.log("USUARIO LOGUEADO");
    console.log(this.usuarioAuth.type);
    console.log(this.visible);
  }
  constructor( public navParams: NavParams,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.visible=<boolean>this.navParams.get("visible");
    console.log("constructor");
    console.log("USUARIO LOGUEADO");
    console.log(this.usuarioAuth.type);
    console.log(this.visible);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
   
  
  }
  goToUsuarioCrear(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CrearusuarioPage);
  }
  goToUsuarioPerfil(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PerfilPage);
  }
  goToExit(params){
    if (!params) params = {};

    this.navCtrl.setRoot(SesionPage);
  }
  goToListareventos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ListareventosPage);
  }

  loginFacebook(){
    location.replace("https://facebook.com");  

  }
  loginTwitter(){
    location.replace("https://twitter.com/nintendoboy?lang=es");
  
  }
}
