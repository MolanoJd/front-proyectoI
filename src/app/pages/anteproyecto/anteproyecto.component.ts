import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnteproyectoService } from '../../services/anteproyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anteproyecto',
  templateUrl: './anteproyecto.component.html',
  styleUrls: ['./anteproyecto.component.css']
})
export class anteproyectoComponent implements OnInit {
  public anteproyecto = {
    atrTitulo: '',
    comentarios: [],
    atrFechaInicio: '', // Agregado nuevo campo
    atrFechaFin: ''     // Agregado nuevo campo
  };

  constructor(
    private anteproyectoService: AnteproyectoService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {}

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
        Swal.fire('Anteproyecto guardado', 'Anteproyecto registrado con éxito en el sistema', 'success');
      },
      (error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
          duration: 3000
        });
      }
    );
  }
}
