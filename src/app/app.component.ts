import { Component } from '@angular/core';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CountdownTimerComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'countdown-timer'
}