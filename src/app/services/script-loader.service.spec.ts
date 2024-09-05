import { Injectable, OnDestroy } from '@angular/core';
import PocketBase from 'pocketbase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtimeSpecialistsService implements OnDestroy {
  private pb: PocketBase;
  private specialistsSubject = new BehaviorSubject<any[]>([]);
  specialists$ = this.specialistsSubject.asObservable();

  constructor() {
    this.pb = new PocketBase('https://db.buckapi.com:8090');
    this.subscribeToSpecialists();
  }

  private async subscribeToSpecialists() {
    // (Opcional) Autenticación
    await this.pb.collection('users').authWithPassword('test@example.com', '123456');

    // Suscribirse a cambios en cualquier registro de la colección 'camiwaSpecialists'
    this.pb.collection('camiwaSpecialists').subscribe('*', (e) => {
      this.handleRealtimeEvent(e);
    });
  }

  private handleRealtimeEvent(event: any) {
    // Aquí puedes manejar las acciones 'create', 'update' y 'delete'
    console.log(event.action);
    console.log(event.record);

    // Para este ejemplo, vamos a actualizar la lista de especialistas
    this.updateSpecialistsList();
  }

  private async updateSpecialistsList() {
    // Obtener la lista actualizada de especialistas
    const records = await this.pb.collection('camiwaSpecialists').getFullList(200 /* cantidad máxima de registros */, {
      sort: '-created' // Ordenar por fecha de creación
    });
    this.specialistsSubject.next(records);
  }

  ngOnDestroy() {
    // Desuscribirse cuando el servicio se destruye
    this.pb.collection('camiwaSpecialists').unsubscribe('*');
  }
}
