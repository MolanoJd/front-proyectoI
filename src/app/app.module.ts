import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { footComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { anteproyectoComponent } from './pages/anteproyecto/anteproyecto.component';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ViewAnteProyectoComponent } from './pages/viewanteproyecto/viewanteproyecto.component';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { ListarAnteProyectoComponent } from './pages/listaranteproyectos/listar.anteproyectos.component';
import { ActualizarusuarioComponent } from './pages/actualizarusuario/actualizarusuario.component';
import { MatDialogModule } from '@angular/material/dialog';

import { VerProyectoComponent } from './pages/verproyecto/ver.proyecto.component';
import { ideaComponent } from './pages/idea/idea.component';
import { ListarUsuariosAnteProyectoComponent } from './pages/listarproyectosporusuario/listarporusuario.component';
import { DescargarComponent } from './pages/descargar/descargar.component';
import { DocumentoComponent } from './pages/subirdocumento/documento.component';
import { ListarUsuariosComponent } from './pages/listarusuarios/listar.usuarios.component';
import { eliminarUsuarioComponent } from './pages/eliminarusuario/eliminar.component';
import { ComentarioComponent } from './pages/agregarcomentario/agregarcomentario.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    footComponent,
    SignupComponent,
    LoginComponent,
    anteproyectoComponent,
    HomeComponent,
    InicioComponent,
    DashboardComponent,
    UserDashboardComponent,
    ListarUsuariosAnteProyectoComponent,
    ViewAnteProyectoComponent,
    ListarAnteProyectoComponent,
    DocumentoComponent,
    ideaComponent,
    ListarUsuariosComponent,
    VerProyectoComponent,
    eliminarUsuarioComponent,
    ComentarioComponent,
    DescargarComponent,
    ActualizarusuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
