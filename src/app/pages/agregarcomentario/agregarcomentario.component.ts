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
  templateUrl: './agregarcomentario.component.html',
  styleUrls: ['./agregarcomentario.component.css']
})
export class ComentarioComponent implements OnInit {
  username = '';
  usuario: any;
  anteproyectos: any;
  atrTitulo: string = '';
  comentario: string = ''; // Propiedad para el comentario

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private anteproyectoService: AnteproyectoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.userService.obtenerUsuario(this.username).subscribe(
      (data) => {
        this.usuario = data;
        console.log(this.usuario);
      },
      (error) => {
        console.log(error);
      }
    );
    if(this.username == 'nmilciadez@unicauca.edu.co'){

    this.anteproyectoService.listarAnteproyectos().subscribe(
      (data: any) => {
        this.anteproyectos = data;
        // this.anteproyectoId = this.anteproyectos.id;
      },
      (error) => {
        alert('Error al cargar los Proyectos');
      }
    );
    }else{
    this.anteproyectoService.listarAnteproyectosPorUsuario(this.username).subscribe(
      (data: any) => {
        this.anteproyectos = data;
        // this.anteproyectoId = this.anteproyectos.id;
      },
      (error) => {
        alert('Error al cargar los Proyectos');
      }
    );
    }
  }

  public addCommentToAnteproyecto() {
    if (!this.comentario) {
      Swal.fire('Error', 'Debe ingresar un comentario', 'error');
      return;
    }



    this.userService.addCommentToAnteproyecto(this.username, this.atrTitulo, this.comentario).subscribe(
      (response) => {
        Swal.fire('Comentario Agregado', 'El comentario ha sido agregado con éxito al anteproyecto', 'success').then(
          (e) => {
            this.router.navigate(['user-dashboard']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido agregar el comentario al anteproyecto', 'error');
        console.log(error);
      }
    );

  }

  agregarDOCAnteproyecto() {
    this.router.navigate(['/AgregarDocumento/',this.usuario?.id]);
  }
  
}
