import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';

@NgModule({
    imports: [
        BrowserModule,
        PerfilRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PerfilComponent
    ]
})
export class PerfilModule { }
