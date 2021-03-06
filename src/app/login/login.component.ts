import {Component} from '@angular/core';
import {Router} from "@angular/router";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import {PerfilService} from '../perfil/perfil.service'

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    constructor(
        private router: Router,
        private db: AngularFireDatabase,
        private perfilService: PerfilService
    ) { }

    login(email: string, senha: string) {
        this.db.list('/usuarios', {
            query: {
                equalTo:email, orderByChild: 'email'
            }
        }).subscribe((usuarios) => {
            let usuarioValido:any = usuarios.find((usu) => {
                return usu.senha == senha;
            });
            // Se usuário não possuir permissão
            if (!usuarioValido) {
                alert('Usuário ou senha inválidos!');
                return;
            }
            this.perfilService.login(usuarioValido, usuarioValido.$key);
            this.router.navigate(['/portal']);
        }, function(err) {
            alert(err);
        });
    }

}
