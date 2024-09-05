import { Component } from '@angular/core';
import { PocketAuthService } from '@app/services/auth-pocketbase.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
constructor(
  public auth: PocketAuthService
){}
}
