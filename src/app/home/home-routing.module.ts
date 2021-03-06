import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home.component';
import { MainComponent } from 'app/main/main.component';
import { AnimalComponent } from 'app/home/animal.component';

const routes: Routes = [
    {
        path: 'portal',
        component: MainComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'home/animal',
                component: AnimalComponent,
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }
