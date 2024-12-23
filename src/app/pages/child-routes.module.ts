import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListaComponent } from './lista/lista.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DetallecitaComponent } from './detallecita/detallecita.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { LegalComponent } from './legal/legal.component';

//pages


const childRoutes: Routes = [

    { path: '',  component: HomeComponent, data:{title:'app'} },

    // {
    // path:'lista', component:ListaComponent
    // },
    {
      path:'perfil', component:PerfilComponent
    },
    {
      path:'perfil-doctor/:id', component:DoctorProfileComponent
    },
    {
      path:'detalle-cita/:id', component:DetallecitaComponent
    },
    {
      path:'lista', component:AyudaComponent
    },
    {
      path:'bip', component:AyudaComponent
    },
    {
      path:'ayuda', component:AyudaComponent
    },
    {
      path:'legal', component:LegalComponent
    },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component:  HomeComponent },


]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute),
    RouterModule.forChild(childRoutes),
  ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
