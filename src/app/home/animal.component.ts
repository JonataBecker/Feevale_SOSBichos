import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from "@angular/router";
import {PerfilService} from '../perfil/perfil.service'
import * as firebase from 'firebase';

@Component({
    selector: 'app-animal',
    templateUrl: './animal.component.html'
})
export class AnimalComponent implements OnInit {

    public animal: FormGroup;
    public animais:FirebaseListObservable<any[]>;

    constructor(
        private router: Router,
        private db: AngularFireDatabase,
        private activatedRoute: ActivatedRoute,
        private perfilService: PerfilService
    ) {
    }

    ngOnInit() {
        this.animal = new FormGroup({
            nome: new FormControl(''),
            descricao: new FormControl(''),
            foto: new FormControl('')
        });
        this.animais = this.db.list('/animais');
    }

    onSubmit({ value, valid }: { value: any, valid:boolean }) {
        if (!valid) {
            alert('Campos obrigatórios não informados!');
            return;
        }
        let novoAnimal = value;
        novoAnimal.dono = this.perfilService.getKey();
        novoAnimal.adotado = false;
       let storageRef = firebase.storage().ref();
       for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
           console.log(selectedFile);
           let router = this.router;
           let path = `/animal/${selectedFile.name}`
           var iRef = storageRef.child(path);
           iRef.put(selectedFile).then((snapshot) => {
               novoAnimal.foto = snapshot.downloadURL;
               this.animais.push(novoAnimal);
               this.router.navigate(['/portal']);
           });
       }
    }


}
