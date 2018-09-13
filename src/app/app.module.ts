import { UsuarioCrearPage } from '../pages/usuario-crear/usuario-crear';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule} from '@angular/http';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SesionPage } from '../pages/sesion/sesion';
import { CaeventoPage } from '../pages/caevento/caevento';
import { MenuPage } from '../pages/menu/menu';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from '../providers/usuario/usuario';import { Geolocation } from '@ionic-native/geolocation';
import { CrearusuarioPage } from '../pages/crearusuario/crearusuario';
import { EventoPage } from '../pages/evento/evento';
import { ListarenoticiasPage } from '../pages/listarenoticias/listarenoticias';
import { ListareventosPage } from '../pages/listareventos/listareventos';
import { EventoProvider } from '../providers/evento/evento';
import { PublicacionProvider } from '../providers/publicacion/publicacion';
import { Camera } from '@ionic-native/camera';

import { LoginvisitantePage } from '../pages/loginvisitante/loginvisitante';
import { PerfilPage } from '../pages/perfil/perfil';
import { ImagenesProvider } from '../providers/imagenes/imagenes';
import { SmsPage } from '../pages/sms/sms';
import { EventousuariosPage } from '../pages/eventousuarios/eventousuarios';


@NgModule({
  declarations: [
    MyApp,
    UsuarioCrearPage,
    SesionPage, 
    CrearusuarioPage,
    EventoPage,
    ListarenoticiasPage,
    ListareventosPage,
    CaeventoPage,
    LoginvisitantePage,
    MenuPage,
    PerfilPage,
    SmsPage,
    EventousuariosPage,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UsuarioCrearPage,  
    SesionPage,
    CrearusuarioPage,
    EventoPage,
    ListarenoticiasPage,
    ListareventosPage,
    CaeventoPage,
    LoginvisitantePage,  
    MenuPage,
    PerfilPage,
    SmsPage,
    EventousuariosPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    Geolocation,
    EventoProvider,
    PublicacionProvider,
    ImagenesProvider,
    
    
  ]
})
export class AppModule {}
