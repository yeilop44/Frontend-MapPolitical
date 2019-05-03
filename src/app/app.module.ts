import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { AvatarModule } from 'ngx-avatar';

//services
import { AuthService } from './services/auth.service';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AfiliadosComponent } from './components/afiliados/afiliados.component';
import { CambiarComponent } from './components/cambiar/cambiar.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { MapaComponent } from './components/mapa/mapa.component';
<<<<<<< HEAD
import { LoadingComponent } from './components/shared/loading/loading.component';
=======
import { UsuarioComponent } from './components/usuario/usuario.component';
>>>>>>> develop


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'afiliados', component: AfiliadosComponent},
  { path: 'graficos', component: GraficosComponent},
  { path: 'mapa', component: MapaComponent},
  { path: 'cambiar', component: CambiarComponent},
  { path: 'usuario', component: UsuarioComponent},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: '**', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    InicioComponent,
    AfiliadosComponent,
    CambiarComponent,
    GraficosComponent,
    MapaComponent,
<<<<<<< HEAD
    LoadingComponent
=======
    UsuarioComponent
>>>>>>> develop
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC69lNgQw1tqaxwZb1NCgj1yn9fvQLMaNg',
      libraries: ['places']
    }),
    AvatarModule
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
