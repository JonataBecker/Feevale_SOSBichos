import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CadastroComponent } from './cadastro.component';
import { PerfilService } from '../perfil/perfil.service'

@NgModule({
    imports: [
        BrowserModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        CadastroComponent
    ],
    providers: [
        PerfilService
    ]
})
export class LoginModule { }
