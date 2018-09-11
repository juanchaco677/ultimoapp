import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { Usuario} from '../../modelo/usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ValerianConstante } from '../../util/valerianconstante';
@Component({
  selector: 'page-sms',
  templateUrl: 'sms.html'
})
export class SmsPage {
  visible:boolean;
  usuarioAuth:Usuario;
  buscar :string;
  listaUsuario:Observable<Usuario[]>;
  listaUsuarioDefinitiva:Array<Usuario>=[];
  data:any;
  mensaje:string;

  constructor(private alertCtrl: AlertController,private loadingCtrl:LoadingController,private usuarioProvider:UsuarioProvider,public navCtrl: NavController) {
    this.visible=true;
    this.usuarioAuth=<Usuario>JSON.parse(localStorage.getItem('usuario')).usuario;
    this.mensaje="";
    this.buscar="";
  }

  cambiarEstado(event){
    this.visible=!event._value;  
  }
  
  buscarUsuarios(evento:any){
    this.buscar = evento.target.value;
      if(this.buscar!="" ){ 
        let id_candidato=this.usuarioAuth.id_candidato == null || this.usuarioAuth.id_candidato == undefined || this.usuarioAuth.id_candidato == "" ?this.usuarioAuth.id:this.usuarioAuth.id_candidato;
        this.usuarioProvider.getUsuarioSms(this.buscar,this.usuarioAuth.token,id_candidato,this.usuarioAuth.id).subscribe(
            data=>{               
                console.log(data["data"]);
                  this.listaUsuario=<Observable<Usuario[]>>data["data"];         
                  for (var i in this.listaUsuario) {
                    let usuarioAux:Usuario=this.listaUsuario[i];
                    this.listaUsuario[i].nombreCompleto=ValerianConstante.getNombreCompleto(usuarioAux);
                  }    
              },
            err=>{        
              console.log("ERROR");
              console.log(err);
            }
          );
      }else{
        this.listaUsuario=null;
      }
    }

    eliminarImagen(j){
      this.listaUsuarioDefinitiva.splice(j,1);
    }
    agregar(usuario:Usuario){
      if(!this.existeUsuarioAgregado(usuario)){
         this.listaUsuarioDefinitiva.push(usuario);
      }
    }
    existeUsuarioAgregado(usuario:Usuario){
      for (var i in this.listaUsuarioDefinitiva) {
        if(this.listaUsuarioDefinitiva[i].id == usuario.id){
          return true;
        }
      }
      return false;
    }

    enviar(){
      if( this.mensaje != ""){
        if(this.visible && this.listaUsuarioDefinitiva.length == 0){
          let alert = this.alertCtrl.create({
            title: 'Envio Masivo SMS',
            subTitle: 'Busque el o usuarios destino para el mensaje SMS.',
            buttons: ['OK']
          });    
          alert.present();
          return;
        }

        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Cargando...'
        });  
        loading.present();

          let id_candidato=this.usuarioAuth.id_candidato == null || this.usuarioAuth.id_candidato == undefined || this.usuarioAuth.id_candidato == "" ?this.usuarioAuth.id:this.usuarioAuth.id_candidato;
  
          this.data={
            usuarios:this.listaUsuarioDefinitiva,
            id_candidato:id_candidato,
            id:this.usuarioAuth.id,
            todos:this.visible,
            mensaje:this.mensaje
          }
    

        this.usuarioProvider.envioSms(this.data,this.usuarioAuth.token).subscribe(
            data=>{               
                  this.listaUsuarioDefinitiva=[];
                  this.data=null;
                  this.visible=true;
                  this.mensaje="";
                  this.buscar="";
                  this.listaUsuario=null;
                  loading.dismiss();
                  let alert = this.alertCtrl.create({
                    title: 'Envio Masivo SMS',
                    subTitle: 'Se enviaron correctamente los Mensajes SMS.',
                    buttons: ['OK']
                  });    
                  alert.present();
              },
            err=>{ 
              this.mensaje="";  
              this.buscar="";     
              console.log("ERROR");
              console.log(err);
              loading.dismiss();
            }
          );
        }else{
          let alert = this.alertCtrl.create({
            title: 'Envio Masivo SMS',
            subTitle: 'El Campo Mensaje es obligatorio.',
            buttons: ['OK']
          });    
          alert.present();
        }
    }
    
  
}
