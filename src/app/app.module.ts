import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { AvatarModule } from 'ngx-avatar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';


//Routes
import { app_routing } from './app.routes'

//services
import { AuthService } from './services/auth.service';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AfiliadosComponent } from './components/afiliados/afiliados.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { ContrasenaComponent } from './components/cuenta/contrasena/contrasena.component';
import { GeofraficaComponent } from './components/cuenta/geofrafica/geofrafica.component';
import { ElectoralComponent } from './components/cuenta/electoral/electoral.component';
import { ModalCargaMasivaComponent } from './components/afiliados/modal-carga-masiva/modal-carga-masiva.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalNuevoContactoComponent } from './components/afiliados/modal-nuevo-contacto/modal-nuevo-contacto.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'afiliados', component: AfiliadosComponent},
  { path: 'graficos', component: GraficosComponent},
  { path: 'mapa', component: MapaComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'cuenta', component: CuentaComponent},
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
    GraficosComponent,
    MapaComponent,
    UsuarioComponent,
    LoadingComponent,
    ModalCargaMasivaComponent,
    CuentaComponent,
    ModalNuevoContactoComponent
    ContrasenaComponent, 
    GeofraficaComponent, ElectoralComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    app_routing,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC69lNgQw1tqaxwZb1NCgj1yn9fvQLMaNg',
      libraries: ['places']
    }),
    NgbModule.forRoot(),
    AvatarModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
