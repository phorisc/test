import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CountdownService } from '../services/countdown.service';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  secondsLeft: number = 0;
  private timerSubscription: Subscription = new Subscription;

  constructor(private countdownService: CountdownService) {}

  ngOnInit(): void {
    this.timerSubscription = interval(1000).pipe(
      switchMap(() => this.countdownService.getSecondsLeft())
    ).subscribe(response => {
      this.secondsLeft = response.secondsLeft;
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}