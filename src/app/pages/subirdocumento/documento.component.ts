import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnteproyectoService } from '../../services/anteproyecto.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {
  userId: number = 0;
  usuario: any;
  anteproyectos: any;
  atrTitulo = '';
  archivoAdjunto: File | null = null;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private anteproyectoService: AnteproyectoService,
    private router: Router
  ) { }


 // Nueva propiedad para almacenar el ID del anteproyecto seleccionado


  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.userService.obtenerUsuario(this.userId).subscribe(
      (data) => {
        this.usuario = data;
        console.log(this.usuario);
      },
      (error) => {
        console.log(error);
      }
    )

    this.anteproyectoService.listarAnteproyectosPorUsuarioID(this.userId).subscribe(
      (data: any) => {
        this.anteproyectos = data;
       // this.anteproyectoId = this.anteproyectos.id;
      },
      (error) => {
        alert('Error al cargar los proyectos');
      }
    )

    
  }

  public onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.archivoAdjunto = inputElement.files[0];
    }
  }
  public addFileToAnteproyecto() {
    if (!this.archivoAdjunto) {
      Swal.fire('Error', 'Debe seleccionar un archivo adjunto', 'error');
      return;
    }

    const data = {
        userId: this.userId,
        atrTitulo: this.atrTitulo,
        archivoAdjunto: this.archivoAdjunto
      };
      this.userService.addFileToAnteproyecto(data.userId, data.atrTitulo, data.archivoAdjunto).subscribe(
        (response) => {
          Swal.fire('Anteproyecto Agregado', 'Usuario tendrá su anteproyecto con éxito', 'success').then(
            (e) => {
              this.router.navigate(['user-dashboard']);
            }
          );
        },
        (error) => {
          Swal.fire('Error en el sistema', `No se ha podido agregar el proyecto. ID del anteproyecto: ${data.atrTitulo} ${data.userId}`, 'error');
          console.log(error);
        }
      );
    }  
  
}

