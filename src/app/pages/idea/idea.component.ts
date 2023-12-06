import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnteproyectoService } from '../../services/anteproyecto.service';
import Swal from 'sweetalert2';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
interface Usuario {
    email: string;
    usuario_nombres: string;
    usuario_apellidos: string;
    usuario_codigo: string;
    id: number;
    // ... otras propiedades
  }
@Component({
  selector: 'app-anteproyecto',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class ideaComponent implements OnInit {
    isLoggedIn = false;
    user: any = null;
    userII: Usuario | null = null;
    infoVisible = false;
    usuarios: Usuario[] = [];

    
  public anteproyecto = {
    atrTitulo: '',
    comentarios: [],
  };

  constructor(
    private loginService: LoginService,
    private anteproyectoService: AnteproyectoService,
    private snack: MatSnackBar,
    private userService: UserService,
    private router: Router
  ) {}

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

  formSubmit() {
 
    console.log(this.anteproyecto);
    if (this.anteproyecto.atrTitulo === '' || this.anteproyecto.atrTitulo === null) {
      this.snack.open('El título del anteproyecto es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    // Aquí puedes agregar validación adicional para atrFechaInicio y atrFechaFin si lo deseas

    this.anteproyectoService.crearAnteproyecto(this.anteproyecto).subscribe(
    (data) => {
        console.log(data);
        Swal.fire('Anteproyecto guardado', 'Anteproyecto registrado con éxito en el sistema', 'success')
            .then((e) => {
                if (this.userII) {
                    
                    this.userService.addProject(this.userII?.email, this.anteproyecto.atrTitulo).subscribe(
                        (response) => {
                          Swal.fire('Proyecto Agregado', 'Recuerde agregar sus Estudiantes', 'success')
                        },
                        (error) => {
                          Swal.fire('Error en el sistema', `No se ha podido agregar el proyecto. ID del anteproyecto: ${this.anteproyecto.atrTitulo} ${this.userII?.email}`, 'error');
                        console.log(error);
                        }
                      );
                      this.router.navigate(['agregarAnteProyecto/',this.userII?.email]).then(() => {
                        window.location.reload(); // Opcional: si realmente necesitas recargar toda la aplicación
                      });
                    
                } else {
                    console.log('No se encontró el usuario correspondiente');
                }
            });
    },
      (error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
          duration: 3000
        });
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

}
