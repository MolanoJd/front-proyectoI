import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSource = new BehaviorSubject<string>('');
  currentNotification = this.notificationSource.asObservable();

  constructor() { }

  notify(message: string) {
    this.notificationSource.next(message);
  }
}
