import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Timer } from 'src/app/shared/models/timer';
import { Observable, interval, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators'
import * as moment from 'moment';


@Component({
  selector: 'app-timer-manual',
  templateUrl: './timer-manual.component.html',
  styleUrls: ['./timer-manual.component.css']
})
export class TimerManualComponent implements OnInit {

  timer: Timer = null;
  isCorrendoContador: boolean = false;
  isValidoStartContador: boolean = true;
  contadorSubs: Subscription;

  @Output() eventTimerFinalizado = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.timer = new Timer();
    this.timer.inicio = moment().toDate();
    this.timer.fim = moment().toDate();
  }

  startStopTimer() {
    if (this.timer.descricao == null) {
      this.isValidoStartContador = false;
    } else {
      if (this.isCorrendoContador) {
        this.contadorSubs.unsubscribe();
        this.isCorrendoContador = false;
        this.eventTimerFinalizado.emit(this.timer);
        this.timer = new Timer();
      } else {
        this.isValidoStartContador = true;
        this.isCorrendoContador = true;
        let int: Subscription = null;
        this.contadorSubs = interval(1000)
          .pipe(
            map((x) => {
              let seconds = x;
              if (x <= 60) {
                this.timer.contador = String(x) + 's';
              } else {
                seconds %= 3600;
                if (x >= 3600) {
                  // timerNovo.contador = moment.utc(moment.duration(x, 'hours').asMilliseconds()).format("HH[h ]mm[m]")
                  this.timer.contador = String(Math.floor(x / 3600)) + 'h ' + String(Math.floor(seconds / 60)) + 'm ' + seconds % 60 + 's'
                } else {
                  // timerNovo.contador = moment.utc(moment.duration(x, 'minutes').asMilliseconds()).format("mm[m]")
                  this.timer.contador = String(Math.floor(seconds / 60)) + 'm ' + seconds % 60 + 's'
                }
              }
            })
          ).subscribe();
      }
    }
  }

  adicionarTimerManual() {

  }

  calcularHoras() {
    console.log(this.timer)
    const inico = moment(this.timer.inicio);
    const fim = moment(this.timer.fim);
    console.log(moment.duration(fim.diff(inico)))
  }

  ngOnDestroy() {
    this.contadorSubs.unsubscribe();
  }
}
