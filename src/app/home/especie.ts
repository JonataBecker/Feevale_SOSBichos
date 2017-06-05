export class Especie {

    public id:number;
    public nome:string;
    public raca:any;

    constructor(id:number, nome:string) {
        this.id = id;
        this.nome = nome;
        this.raca = [];
    }

    addRaca(id, descricao) {
        this.raca.push({id:id, descricao: descricao});
    }

}
