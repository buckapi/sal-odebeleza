import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../ui/footer/footer.component';
import { RealtimeSpecialistsService } from '@app/services/realtime-specialists.service';
// import { PocketbaseService } from '@app/services/pocketbase.service';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@app/services/global-service.service';

// Define la interfaz Specialty directamente en este archivo
interface services {
  name: string;
  id: string;
  fatherId: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  // styleUrl: './home.component.css'
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  services: any[] = [];
  private subscription: Subscription = new Subscription();
  constructor(
    private realtimeSpecialistsService: RealtimeSpecialistsService,
    public global: GlobalService
  ) {}
  setPreview(services:any){
    
    this.global.setRoute('detail-services');

  }
  limitWords(description: string, wordLimit: number): string {
    const words = description.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
  }
  
  ngOnInit(): void {
    this.realtimeSpecialistsService.services$.subscribe((data) => {
      this.services = data;
  
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
