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
        this.timer.inicio = moment().toDate();
        this.timer.fim = moment().toDate();
      } else {
        this.isValidoStartContador = true;
        this.isCorrendoContador = true;
        const inico = moment(this.timer.inicio);
        const fim = moment(this.timer.fim);
        const startComSegundos = moment.duration(fim.diff(inico)).asSeconds();
        this.contadorSubs = interval(1000)
          .pipe(
            map((x) => {
              if(startComSegundos !== 0) {
                x = startComSegundos;
              }
              let seconds = x;
              console.log(startComSegundos)
             
              if (x <= 60) {
                this.timer.contador = String(x) + 's';
              } else {
                seconds %= 3600;
                if (x >= 3600) {
                  this.timer.contador = String(Math.floor(x / 3600)) + 'h ' + String(Math.floor(seconds / 60)) + 'm ' + seconds % 60 + 's'
                } else {
                  this.timer.contador = String(Math.floor(seconds / 60)) + 'm ' + seconds % 60 + 's'
                }
              }
            })
          ).subscribe();
      }
    }
  }

  adicionarTimerManual() {
    if(!this.timer.foiAlteradoHorasInicioFim) {
      const horaAtual = moment();
      let horaFinal = moment();

      const regex = /[0-9]{1,2}[hms]{1,2}/g
      const regDigito = /[0-9]{1,2}/g
     this.timer.contador.toLowerCase().match(regex)
      .forEach((value) => {
        const resultado = value.match(regDigito)[0];
          if (value.includes("h")) {
            horaFinal.add(Number(resultado), 'hours')
          }
          if (value.includes("m")) {
            horaFinal.add(Number(resultado), 'minutes')
          }
      })
      this.timer.inicio = horaAtual.toDate();
      this.timer.fim = horaFinal.toDate();
    }
    this.eventTimerFinalizado.emit(this.timer);
    this.timer = new Timer();
  }

  calcularHoras() {
    const inico = moment(this.timer.inicio);
    const fim = moment(this.timer.fim);
    this.timer.contador = moment.utc(moment.duration(fim.diff(inico)).asMilliseconds()).format("HH[h ]mm[m]");
    this.timer.foiAlteradoHorasInicioFim = true;
  }

  ngOnDestroy() {
    this.contadorSubs.unsubscribe();
  }
}
