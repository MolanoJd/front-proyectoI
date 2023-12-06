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
  templateUrl: './descargar.component.html',
  styleUrls: ['./descargar.component.css']
})
export class DescargarComponent implements OnInit {
  userId: number = 0;
  usuario: any;
  anteproyectos: any;
  atrTitulo = '';
  nombreArchivo: string = '';
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

 

    descargarArchivo(nombreArchivo: string) {
        this.userService.descargarArchivo(this.atrTitulo, nombreArchivo).subscribe(data => {
          const url = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = url;
          link.download = nombreArchivo;
          link.click();
          window.URL.revokeObjectURL(url);
        }, error => {
          console.log(error);
          Swal.fire('Error', 'Error al descargar el archivo', 'error');
        });
      }
  
}

