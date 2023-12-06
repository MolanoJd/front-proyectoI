import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-actualizarusuario',
  templateUrl: './actualizarusuario.component.html', // Asegúrate de que el nombre del archivo es correcto
  styleUrls: ['./actualizarusuario.component.css'] // Asegúrate de que el nombre del archivo es correcto
})
export class ActualizarusuarioComponent implements OnInit {
  usuarios: any = [];
  selectedUserEmail: string | null = null; // Email del usuario seleccionado para actualizar
  public selectedRole = ''; // Agrega esta propiedad para almacenar el rol seleccionado

  public user = {
    email: '',
    password: '',
    usuario_nombres: '',
    usuario_apellidos: '',
    usuario_codigo: 0,
    dtype: ''
  };

  constructor(private userService: UserService, private snack: MatSnackBar) { }
 // Agrega el rol seleccionado al objeto user
 
  ngOnInit(): void {
    this.cargarUsuarios();
  }
   
  cargarUsuarios() {
    this.userService.listarUsuarios().subscribe(
      (dato: any) => {
        this.usuarios = dato;
        console.log(this.usuarios);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los usuarios', 'error');
      }
    );
  }



  cargarDatosUsuario(email: string) {
    if (email !== null) {
      this.selectedUserEmail = email;
      this.userService.obtenerUsuario( this.selectedUserEmail).subscribe(
        (data: any) => {
          this.user = data;
        }, (error) => {
          console.log(error);
          Swal.fire('Error', 'Error al cargar los datos del usuario', 'error');
        }
      );
    }
  }

  formSubmit() {
    console.log(this.user);
    if (this.user.email == '' || this.user.email == null) {
      this.snack.open('El email es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.selectedUserEmail !== null) {
      this.userService.actualizarUsuario(this.selectedUserEmail, this.user,this.selectedRole).subscribe(
        (data) => {
          console.log(data);
          Swal.fire('Usuario actualizado', 'Usuario actualizado con éxito en el sistema', 'success');
          this.cargarUsuarios(); // Recarga la lista de usuarios después de la actualización
        }, (error) => {
          console.log(error);
          this.snack.open('Ha ocurrido un error al actualizar !!', 'Aceptar', {
            duration: 3000
          });
        }
      );
    }
  }

}
