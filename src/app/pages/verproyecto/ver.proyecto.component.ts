import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnteproyectoService } from '../../services/anteproyecto.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './../../services/login.service';
interface Usuario {
    email: string;
    usuario_nombres: string;
    usuario_apellidos: string;
    usuario_codigo: string;
    id: number;
    dtype: string;
    
    // ... otras propiedades
  }

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './ver.proyecto.component.html',
  styleUrls: ['./ver.proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {
  proyectoID: number = 0;
  usuario: any;
  proyecto: any;
  atrTitulo = '';
  isLoggedIn = false;
  user: any = null;
  userII: Usuario | null = null;
  infoVisible = false;
  usuarios: Usuario[] = [];
  estudiantes: Usuario[] = []; // Array para almacenar solo estudiantes
  directores: Usuario[] = []; 
  jurados: Usuario[] = []; 
  asesores: Usuario[] = []; 
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private userService: UserService,
    private anteproyectoService: AnteproyectoService,
    private router: Router
  ) { }


 // Nueva propiedad para almacenar el ID del anteproyecto seleccionado


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
    this.proyectoID = this.route.snapshot.params['proyectoID'];
    this.anteproyectoService.obtenerAnteproyectoPorId(this.proyectoID).subscribe(
      (data) => {
        this.proyecto = data;
        console.log(this.usuario);
        this.filtrarEstudiantes();
        this.filtrarDirectores();
        this.filtrarJurados() ;
      },
      (error) => {
        console.log(error);
      }
    )
    
  }
  filtrarEstudiantes() {
    if (this.proyecto && this.proyecto.usuarios) {
      this.estudiantes = this.proyecto.usuarios.filter((usuario: Usuario) => usuario.dtype === 'ESTUDIANTE');
   }
   
  }
  filtrarAsesores() {
    if (this.proyecto && this.proyecto.usuarios) {
      this.asesores = this.proyecto.usuarios.filter((usuario: Usuario) => usuario.dtype === 'ASESOR');
   }
  }
  filtrarJurados() {
    if (this.proyecto && this.proyecto.usuarios) {
      this.jurados = this.proyecto.usuarios.filter((usuario: Usuario) => usuario.dtype === 'JURADO');
   }
  }

  filtrarDirectores() {
    if (this.proyecto && this.proyecto.usuarios) {
      this.directores = this.proyecto.usuarios.filter((usuario: Usuario) => usuario.dtype === 'DIRECTOR');
   }
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
  agregarDOCAnteproyecto() {
    this.router.navigate(['/AgregarDocumento/',this.userII?.id]);
  }
  agregarComentario() {
    this.router.navigate(['/agregarcomentario/',this.userII?.email]);
  }
  descargarDocumento() {
    this.router.navigate(['/descargarDocumento/',this.userII?.id]);
  }
  agregarProyecto() {
    this.router.navigate(['/agregarAnteProyecto/',this.userII?.email]);
  }
  notificar(recibe: string) {
    this.router.navigate(['/agregarAnteProyecto/',recibe]);
  }

}

