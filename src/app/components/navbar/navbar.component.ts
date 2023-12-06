import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './../../services/notificacion.service';
import { LocalStorageService } from './../../services/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user: any = null;
  showNotifications = false; // Agregado para controlar la visibilidad del cuadro de notificaciones
  notifications: string[] = [];
  constructor(public login: LoginService,private router: Router,private notificationService: NotificationService, private localStorageService: LocalStorageService) { }
  // El correo del usuario actual
  notificacion!: string | null;


  ngOnInit(): void {
    //this.notificacion = this.localStorageService.obtenerNotificacion(this.user.username);

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    );
    this.notificacion = this.localStorageService.obtenerNotificacion(this.user.username);

  }

  public logout() {
    this.login.logout(); // Asegúrate de que esto limpia adecuadamente los datos de la sesión
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Opcional: si realmente necesitas recargar toda la aplicación
    });
  }
  
  // Método para controlar la visibilidad del cuadro de notificaciones
  public toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}

