import  Swal  from 'sweetalert2';
import { AnteproyectoService } from '../../services/anteproyecto.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-categorias',
  templateUrl: './listar.anteproyectos.component.html',
  styleUrls: ['./listar.anteproyectos.component.css']
})
export class ListarAnteProyectoComponent implements OnInit {

  anteproyectos:any = [

  ]


  constructor(private anteproyectoService:AnteproyectoService,private router:Router) { }

  ngOnInit(): void {
    this.anteproyectoService.listarAnteproyectos().subscribe(
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