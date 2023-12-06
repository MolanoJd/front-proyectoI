import  Swal  from 'sweetalert2';
import { AnteproyectoService } from '../../services/anteproyecto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';@Component({
  selector: 'app-view-categorias',
  templateUrl: './listarporusuario.component.html',
  styleUrls: ['./listarporusuario.component.css']
})
export class ListarUsuariosAnteProyectoComponent implements OnInit {
    username = '';
  anteproyectos:any = [

  ]


  constructor(private route: ActivatedRoute,private anteproyectoService:AnteproyectoService,private router:Router) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.anteproyectoService.listarAnteproyectosPorUsuario(this.username).subscribe(
      (dato:any) => {
        this.anteproyectos = dato;
        console.log(this.anteproyectos);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar los anteproyectos','error');
      }
    )
  }

  verproyecto(proyectoID:number) {
    this.router.navigate(['/verproyecto/',proyectoID]);
  }

}