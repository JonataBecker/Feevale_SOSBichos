import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AnimalComponent } from './animal.component';
import { AnimaisPipe } from './animal.pipe';
import { EspecieService } from './especie.service'

@NgModule({
    imports: [
        BrowserModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        HomeComponent,
        AnimalComponent,
        AnimaisPipe
    ],
    providers: [
        EspecieService
    ]
})
export class HomeModule { }
