import { Timer } from './../shared/models/timer';
import { TimerService } from './services/timer.service';
import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  timerList: Timer[] = [];
  teste: string;

  constructor(private timerService: TimerService) { }

  atualizaContador(timer: Timer) {
    console.log(timer.contador.match(/([0-9])+([hm])/))
      if(timer.contador.includes("h")) {

      }

      console.log(timer)
  }

  ngOnInit() {
      this.timerList.push(new Timer("Teste", null, "10h 10m"))
      this.timerList.push(new Timer("Teste2", "Nota teste", "1h 10m"))
      this.timerList.push(new Timer("Teste3", null, "10m"))
  }

}
