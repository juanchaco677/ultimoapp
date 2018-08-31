import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Usuario} from '../../modelo/usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
    usuarioAuth: Usuario;
    
    constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, public redireccionar: NavController, private usuarioProvider: UsuarioProvider) {
        this.usuarioAuth = <Usuario>JSON.parse(localStorage.getItem('usuario')).usuario;      
    }

    actualizarUsuario(formulario): void {
        let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Cargando...'
        });
        loading.present();

        if (formulario.value.name.length > 0 && formulario.value.name != "" && formulario.value.name != undefined && formulario.value.name != null) {

            let nombres: string[] = formulario.value.name.split(" ");
            formulario.value.nombre = this.recursivo(nombres, 0);
            formulario.value.nombre2 = this.recursivo(nombres, 1);
            formulario.value.apellido = this.recursivo(nombres, 2);
            formulario.value.apellido2 = this.recursivo(nombres, 3);

        } else {
            formulario.value.nombre = "ANONIMO";
            formulario.value.nombre2 = "ANONIMO";
            formulario.value.apellido = "ANONIMO";
            formulario.value.apellido2 = "ANONIMO";

        }
        this.usuarioProvider.getUsuario(this.usuarioAuth.token).subscribe(
            data => {
                this.usuarioAuth=<Usuario>data["data"];
                loading.dismiss(); 
                let alert = this.alertCtrl.create({
                    title: "Se actualizo correctamente la información.",
                    subTitle: data["msg"],
                    buttons: ['OK']
                });
                alert.present();      
            },
            err => {
                loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: 'Error al actualizar los datos personales.',
                    subTitle: JSON.parse(err["_body"]).error,
                    buttons: ['OK']
                });
                alert.present();   
            }
        );
    }

    recursivo(arrayNombre: string[], i: number): String {
        if (arrayNombre[i] != "" && arrayNombre[i] != null && arrayNombre[i] != undefined) {
            return arrayNombre[i];
        } else if (arrayNombre[i] == undefined) {
            return "";
        }
        return this.recursivo(arrayNombre, i + 1);
    }
}
