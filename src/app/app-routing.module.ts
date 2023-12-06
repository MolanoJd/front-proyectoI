import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { anteproyectoComponent } from './pages/anteproyecto/anteproyecto.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAnteProyectoComponent } from './pages/viewanteproyecto/viewanteproyecto.component';
import { ListarAnteProyectoComponent } from './pages/listaranteproyectos/listar.anteproyectos.component';
import { ideaComponent } from './pages/idea/idea.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DocumentoComponent } from './pages/subirdocumento/documento.component';
import { eliminarUsuarioComponent } from './pages/eliminarusuario/eliminar.component';
import { ListarUsuariosComponent } from './pages/listarusuarios/listar.usuarios.component';
import { ComentarioComponent } from './pages/agregarcomentario/agregarcomentario.component';
import { VerProyectoComponent } from './pages/verproyecto/ver.proyecto.component';
import { ListarUsuariosAnteProyectoComponent } from './pages/listarproyectosporusuario/listarporusuario.component';
import { DescargarComponent } from './pages/descargar/descargar.component';
import { ActualizarusuarioComponent } from './pages/actualizarusuario/actualizarusuario.component';

const routes: Routes = [
  {
    path : '',
    component : InicioComponent,
    pathMatch : 'full'
  },
  {
    path : 'home',
    component : HomeComponent,
    pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  /*{
    path:'admin',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  },*/
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:'full',
  },
  {
    path : 'idea',
    component : ideaComponent,
    pathMatch : 'full'
  },
  {
    path : 'antreproyectos',
    component : anteproyectoComponent,
    pathMatch : 'full'
  },
  {
    path:'listarProyectos/:username',
    component:ListarUsuariosAnteProyectoComponent,
    pathMatch : 'full'
  },
  {
    path:'agregarAnteProyecto/:username',
    component:ViewAnteProyectoComponent,
    pathMatch : 'full'
  },
  {
    path:'descargarDocumento/:userId',
    component:DescargarComponent
  },
  {
    path:'AgregarDocumento/:userId',
    component:DocumentoComponent
  },

  {
    path:'anteproyectos',
    component:ListarAnteProyectoComponent
  },
  {
    path:'usuarios',
    component:ListarUsuariosComponent
  },
  {
    path:'Eliminarusuarios',
    component:eliminarUsuarioComponent
  },
  {
    path:'agregarcomentario/:username',
    component:ComentarioComponent
  },
  {
    path:'verproyecto/:proyectoID',
    component:VerProyectoComponent
  },
  {
    path:'actualizarusuario',
    component:ActualizarusuarioComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
