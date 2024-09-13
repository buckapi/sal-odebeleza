import { Component } from '@angular/core';
import { GlobalService } from '@app/services/global-service.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(
    public global: GlobalService
  ) {}
}
