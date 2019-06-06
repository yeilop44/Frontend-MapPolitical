import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AfiliadosComponent } from './components/afiliados/afiliados.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { ContrasenaComponent } from './components/cuenta/contrasena/contrasena.component';
import { GeofraficaComponent } from './components/cuenta/geofrafica/geofrafica.component';
import { ElectoralComponent } from './components/cuenta/electoral/electoral.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'afiliados', component: AfiliadosComponent},
    { path: 'graficos', component: GraficosComponent},
    { path: 'mapa', component: MapaComponent},
    { path: 'usuario', component: UsuarioComponent},
    { path: 'cuenta', component: CuentaComponent, children:[
        { path: 'geografica', component: GeofraficaComponent },
        { path: 'contrasena', component: ContrasenaComponent },
        { path: 'electoral', component: ElectoralComponent },
        { path: '**', pathMatch: 'full', redirectTo: 'geografica' }
    ]},    
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    { path: '**', component: LoginComponent }
  ];

  export const app_routing = RouterModule.forRoot(appRoutes);