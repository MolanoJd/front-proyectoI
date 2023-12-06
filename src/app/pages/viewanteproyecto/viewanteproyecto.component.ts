import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnteproyectoService } from '../../services/anteproyecto.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from './../../services/notificacion.service';
import { LocalStorageService } from './../../services/localstorage.service';
 
@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './view-anteproyecto.component.html',
  styleUrls: ['./view-anteproyecto.component.css']
})
export class ViewAnteProyectoComponent implements OnInit {
  username = '';
  usuario: any;
  anteproyectos: any;
  atrTitulo = '';
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private anteproyectoService: AnteproyectoService,
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService

  ) { }


 // Nueva propiedad para almacenar el ID del anteproyecto seleccionado


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
    )
      if(this.username == 'jefaturasx@unicauca.edu.co'){

        this.anteproyectoService.listarAnteproyectos().subscribe(
          (data: any) => {
            this.anteproyectos = data;
           // this.anteproyectoId = this.anteproyectos.id;
          },
          (error) => {
            alert('Error al cargar los proyectos');
          }
        )

      }else{
      this.anteproyectoService.listarAnteproyectosPorUsuario(this.username).subscribe(
      (data: any) => {
        this.anteproyectos = data;
       // this.anteproyectoId = this.anteproyectos.id;
      },
      (error) => {
        alert('Error al cargar los proyectos');
      }
    )
      }
  }

  public addProject() {
    const data = {
      username: this.username,
      atrTitulo: this.atrTitulo
    };
  
    this.userService.addProject(data.username, data.atrTitulo).subscribe(
      (response) => {
        //this.notificationService.notify('Proyecto agregado correctamente');
       // this.localStorageService.guardarNotificacion(usuarioId, `Has sido agregado al anteproyecto ${anteproyectoId}`);
       this.localStorageService.guardarNotificacion(data.username, `Has sido agregado al anteproyecto ${data.atrTitulo}`);
      
      
        Swal.fire('Proyecto Agregado', 'Usuario tendrá su Proyecto con éxito', 'success').then(
          (e) => {
            //this.router.navigate(['user-dashboard']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema', `No se ha podido agregar el proyecto. ID del anteproyecto: ${data.atrTitulo} ${data.username}`, 'error');
      console.log(error);
      }
    );
  }
  regresarDashboarad() {
    this.router.navigate(['user-dashboard']);
  }
  regresarHome() {
    this.router.navigate(['home']);
  }
  
}

