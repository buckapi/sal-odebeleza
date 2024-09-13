import { Component } from '@angular/core';
import { GlobalService } from '@app/services/global-service.service';
import { RealtimeSpecialistsService } from '@app/services/realtime-specialists.service';

@Component({
  selector: 'app-detail-service',
  standalone: true,
  imports: [],
  templateUrl: './detail-service.component.html',
  styleUrl: './detail-service.component.css'
})
export class DetailServiceComponent {
  constructor(
    private realtimeSpecialistsService: RealtimeSpecialistsService,
    public global: GlobalService
  ) {}
}
