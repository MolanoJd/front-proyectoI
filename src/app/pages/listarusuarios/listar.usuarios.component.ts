import  Swal  from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-listar-usuarios',
    templateUrl: './listar.usuarios.component.html',
    styleUrls: ['./listar.usuarios.component.css']
  })
export class ListarUsuariosComponent implements OnInit {

  usuarios:any = [

  ]

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.listarUsuarios().subscribe(
      (dato:any) => {
        this.usuarios = dato;
        console.log(this.usuarios);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar los Usuarios','error');
      }
    )
  }


}