import { Injectable } from '@angular/core';
import { Especie } from './especie';

@Injectable()
export class EspecieService {

    private especies: Map<number, Especie>;

    constructor() {
        this.especies = new Map();
        let cachorro:Especie = new Especie(1, 'Cachorro');
        cachorro.addRaca(1, "Pug");
        cachorro.addRaca(2, "Beagle");
        cachorro.addRaca(3, "Bulldog");
        cachorro.addRaca(4, "Boxer");
        this.especies.set(1, cachorro);
        let macaco:Especie = new Especie(2, 'Macaco');
        macaco.addRaca(1, "Prego");
        macaco.addRaca(2, "Bugio");
        macaco.addRaca(3, "Gorila");
        this.especies.set(2, macaco);
    }

    getEspecies() {
        return Array.from(this.especies.values());
    }

    getRaca(idEspecie: number) {
        let itens = this.getEspecies();
        for (let i = 0; i < itens.length; i++) {
            if (itens[i].id == idEspecie) {
                return itens[i].raca;
            }
        }
        return [];
    }

}
