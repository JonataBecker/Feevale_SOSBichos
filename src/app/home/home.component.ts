import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from "@angular/router";
import { PerfilService} from '../perfil/perfil.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public animais:FirebaseListObservable<any[]>;
    public filtro:any;
    public usuario:string;
    public itens:any;

    constructor(
        private router: Router,
        private db: AngularFireDatabase,
        private activatedRoute: ActivatedRoute,
        private perfilService: PerfilService
    ) { }

    ngOnInit() {
        this.reload();
        this.usuario = this.perfilService.getKey();
    }

    private reload() {
        this.animais = this.db.list('/animais',  {
            query: {
                equalTo:false, orderByChild: 'adotado'
            }
        });
        this.animais.subscribe((data) => {
            this.itens = [];
            data.forEach((dataItem) => {
                let interesse = false;
                if (dataItem.adocao) {
                    interesse = dataItem.adocao.find((i) => {return i == this.usuario});
                }
                this.itens.push({interesse:interesse, value:dataItem})
            });

        });
    }

    todosAnimais() {
        this.filtro = null;
    }

    meusAnimais() {
        this.filtro = {dono:this.perfilService.getKey()};
    }

    adocao() {
        this.filtro = {adocao:this.perfilService.getKey()};
    }

    adotado(item:any) {
        item.value.adotado = true;
        this.animais.update(item.value.$key, item.value);
        this.reload();
    }

    interesse(item:any) {
        if (!item.value.adocao) {
            item.value.adocao = [];
        }
        item.interesse = true;
        item.value.adocao.push(this.perfilService.getKey());
        this.animais.update(item.value.$key, item.value);
    }

}
