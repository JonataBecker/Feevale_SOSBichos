import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PerfilService } from '../perfil/perfil.service'

@Component({
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

    public cadastro: FormGroup;

    constructor(
        private router: Router,
        private db: AngularFireDatabase,
        private perfilService: PerfilService
    ) {
    }

    ngOnInit() {
        this.cadastro = new FormGroup({
            nome: new FormControl(''),
            email: new FormControl(''),
            senha: new FormControl('')
        });
    }

    onSubmit({ value, valid }: { value: any, valid:boolean }) {
        if (!valid) {
            alert('Campos obrigatórios não informados!');
            return;
        }
        let items: FirebaseListObservable<any[]> = this.db.list('/usuarios');
        let data = items.push(value);
        this.perfilService.login(value, data.key);
        this.router.navigate(['portal']);
    }

}
