import  Swal  from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminarusuario',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class eliminarUsuarioComponent implements OnInit {

  usuarios : any = [

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
        Swal.fire('Error','Error al cargar los usuarios','error');
      }
    )
  }

  eliminarUsuario(UsuarioId:any){
    Swal.fire({
      title:'Eliminar Usuario',
      text:'¿Estás seguro de eliminar el Usuario?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.userService.eliminarUsuario(UsuarioId).subscribe(
          (data) => {
            this.usuarios = this.usuarios.filter((usuario:any) => usuario.userId != UsuarioId);
            Swal.fire('Usuario eliminado','El Usuario ha sido eliminado de la base de datos','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar el Usuario','error');
          }
        )
      }
    })
  }
}