import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from "@angular/router";
import { PerfilService } from '../perfil/perfil.service'
import { EspecieService } from './especie.service'

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
    public especies: any;
    public racas:any;

    constructor(
        private router: Router,
        private db: AngularFireDatabase,
        private activatedRoute: ActivatedRoute,
        private perfilService: PerfilService,
        private especieService: EspecieService
    ) { }

    ngOnInit() {
        this.reload();
        this.todosAnimais();
        this.usuario = this.perfilService.getKey();
        this.especies = this.especieService.getEspecies();
        this.racas = [];
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
        this.filtro = {todos:'todos'};
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

    onChangeEspecie($event) {
        this.filtro.especie = $event.target.value;
        this.filtro.raca = null;
        this.racas = [];
        if ($event.target.value) {
            this.racas = this.especieService.getRaca($event.target.value);
        }
    }

    onChangeRaca($event) {
        this.filtro.raca = $event.target.value;
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
