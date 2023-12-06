import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { UserService } from './../../services/user.service';
import Swal from 'sweetalert2';
import { SignupComponent } from '../signup/signup.component';
import { anteproyectoComponent } from '../anteproyecto/anteproyecto.component';
import { Router } from '@angular/router';
interface Usuario {
  email: string;
  usuario_nombres: string;
  usuario_apellidos: string;
  usuario_codigo: string;
  // ... otras propiedades
}

@Component({
  selector: 'home-component',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;
  userII: Usuario | null = null;
  infoVisible = false;
  usuarios: Usuario[] = [];

  constructor(private loginService: LoginService, public userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    console.log('Usuario logueado:', this.user);

    this.userService.listarUsuarios().subscribe(
      (data: any) => {
        const usuarios = data as Usuario[];
        this.usuarios = usuarios;
        console.log('Lista de usuarios:', this.usuarios);
        this.buscarUsuarioCorrespondiente();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los usuarios', 'error');
      }
    );
    
  }

  buscarUsuarioCorrespondiente() {
    if (this.user && this.user.username) {
      const username = this.user.username;
      console.log('Buscando usuario con username:', username);
      this.userII = this.usuarios.find(u => u.email === username) ?? null;
      console.log('Usuario correspondiente:', this.userII);
    } else {
      console.log('No hay usuario logueado o falta username');
    }
  }

  cargarFormularioRegistro() {
    this.router.navigate(['/signup']);
  }

  cargarFormularioAnteproyecto() {
    this.router.navigate(['/antreproyectos']);
  }
  ListarAnteproyecto() {
    this.router.navigate(['/anteproyectos/']);
  }
  toggleInfo() {
    this.infoVisible = !this.infoVisible;
  }
  agregarProyecto() {
    this.router.navigate(['/agregarAnteProyecto/',this.userII?.email]);
  }
  actualizarUsuario() {
    this.router.navigate(['/actualizarusuario/']);
  }
}
