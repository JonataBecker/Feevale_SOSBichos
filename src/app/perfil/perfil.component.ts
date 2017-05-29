import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from "@angular/router";
import {PerfilService} from '../perfil/perfil.service'

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

    public perfil: FormGroup;
    public perfils:FirebaseListObservable<any[]>;

    constructor(
        private router: Router,
        private db: AngularFireDatabase,
        private activatedRoute: ActivatedRoute,
        private perfilService: PerfilService
    ) {
    }

    ngOnInit() {
        this.perfil = new FormGroup({
            nome: new FormControl(''),
            email: new FormControl(''),
            senha: new FormControl('')
        });
        this.perfils = this.db.list('/usuarios');
        this.perfils.subscribe((data) =>{
            data.forEach((p) => {
                if (p.$key == this.perfilService.getKey()) {
                    this.perfil.reset(p);
                }
            })
        });
    }

    onSubmit({ value, valid }: { value: any, valid:boolean }) {
        if (!valid) {
            alert('Campos obrigatórios não informados!');
            return;
        }
        this.perfils.update(this.perfilService.getKey(), value);
    }


}
