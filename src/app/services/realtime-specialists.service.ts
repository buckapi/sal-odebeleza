import { Injectable, OnDestroy } from '@angular/core';
import PocketBase from 'pocketbase';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealtimeSpecialistsService implements OnDestroy {
  private pb: PocketBase;

  // Definir BehaviorSubjects y Observables específicos
  private servicesSubject = new BehaviorSubject<any[]>([]);
  public services$: Observable<any[]> = this.servicesSubject.asObservable();

  private cursosSubject = new BehaviorSubject<any[]>([]);
  public cursos$: Observable<any[]> = this.cursosSubject.asObservable();

  constructor() {
    this.pb = new PocketBase('https://db.buckapi.com:8090');
    this.subscribeToCollections();
  }

  private async subscribeToCollections() {
    // (Opcional) Autenticación
    await this.pb
      .collection('users')
      .authWithPassword('admin@email.com', 'admin1234');

    // Suscribirse a las colecciones específicas
    this.pb.collection('tServices').subscribe('*', (e) => {
      this.handleRealtimeEvent(e, 'services');
    });
    this.pb.collection('tCursos').subscribe('*', (e) => {
      this.handleRealtimeEvent(e, 'cursos');
    });
    // Inicializar las listas
    this.updateServicesList();
    this.updateCursos();
  }

 
  private handleRealtimeEvent(event: any, collectionName: string) {
    console.log(`Evento en ${collectionName}: ${event.action}`);
    console.log(event.record);

    // Actualizar la lista de la colección correspondiente
    this.updateServicesList();
    this.updateCursos();
  }

  private async updateServicesList() {
    const records = await this.pb
    .collection('tServices')
    .getFullList(200 /* cantidad máxima de registros */, {
      sort: '-created', // Ordenar por fecha de creación
    });
  this.servicesSubject.next(records);
  }

  private async updateCursos() {
    // Obtener la lista actualizada de especialistas
    const records = await this.pb
      .collection('tCursos')
      .getFullList(200 /* cantidad máxima de registros */, {
        sort: '-created', // Ordenar por fecha de creación
      });
    this.cursosSubject.next(records);
  }



  ngOnDestroy() {
    // Desuscribirse de las colecciones cuando el servicio se destruye
    this.pb.collection('tServices').unsubscribe('*');
    this.pb.collection('tCursos').unsubscribe('*');

    // Desuscribirse de otras colecciones si es necesario
  }

}

/* export class RealtimeSpecialistsService implements OnDestroy {
  private pb: PocketBase;
  private specialistsSubject = new BehaviorSubject<any[]>([]);

  // Esta es la propiedad que expondrá el Observable para que los componentes puedan suscribirse a ella
  public services$: Observable<any[]> =
    this.specialistsSubject.asObservable();

  constructor() {
    this.pb = new PocketBase('https://db.buckapi.com:8090');
    this.subscribeToSpecialists();
  }

  private async subscribeToSpecialists() {
    // (Opcional) Autenticación
    await this.pb
      .collection('users')
      .authWithPassword('admin@email.com', 'admin1234');

    // Suscribirse a cambios en cualquier registro de la colección 'camiwaSpecialists'
    this.pb.collection('tServices').subscribe('*', (e) => {
      this.handleRealtimeEvent(e);
    });

    // Inicializar la lista de especialistas
    this.updateSpecialistsList();
  }

  private handleRealtimeEvent(event: any) {
    // Aquí puedes manejar las acciones 'create', 'update' y 'delete'
    console.log(event.action);
    console.log(event.record);

    // Actualizar la lista de especialistas
    this.updateSpecialistsList();
  }

  private async updateSpecialistsList() {
    // Obtener la lista actualizada de especialistas
    const records = await this.pb
      .collection('tServices')
      .getFullList(200 , {
        sort: '-created', // Ordenar por fecha de creación
      });
    this.specialistsSubject.next(records);
  }

  ngOnDestroy() {
    // Desuscribirse cuando el servicio se destruye
    this.pb.collection('tServices').unsubscribe('*');
  }
} */
