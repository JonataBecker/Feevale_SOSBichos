import { Injectable } from '@angular/core';

@Injectable()
export class PerfilService {

    private perfil:any;
    private key:string;

    constructor() {
        this.perfil = null;
        this.key = null;
    }

    login(perfil, key) {
        this.perfil = perfil;
        this.key = key;
    }

    logout() {
        this.perfil = null;
        this.key = null;
    }

    isLogado():boolean {
        return this.key != null;
    }

    getKey():string {
        return this.key;
    }
}
