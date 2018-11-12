import { Timer } from './../shared/models/timer';
import { TimerService } from './services/timer.service';
import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators'
import * as moment from 'moment';
import 'moment/locale/pt-br';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timerList: Timer[] = [];
  totalHorasDiaria: string = ''
  dataTimer: string;

  constructor(private timerService: TimerService) { }

  atualizaContador(timer: Timer) {
    let entradaTimer = timer.contador.toLowerCase();
    const regex = /[0-9]{1,2}[hms]{1,2}/g

    let regMatch = entradaTimer.match(regex);
    if (regMatch != null) {
      regMatch.forEach((value) => {
        console.log(value)
        if (value.includes("h")) {

        }
      })
    } else {
      const regexSoDigitos = /[0-9]{1,6}/g
      let regMatchDigito = entradaTimer.match(regexSoDigitos);
      if (regMatchDigito != null) {
        regMatchDigito.forEach(e => {
          let momentConvert = moment(e, 'hmm')
          if (momentConvert.isValid()) {
            timer.contador = momentConvert.format("HH[h ]mm[m]")
          } else {
            if (e.length === 1) {
              timer.contador = moment.utc(moment.duration(Number(e), 'hours').asMilliseconds()).format("HH[h ]mm[m]");
            } else {
              if (e.length === 2) {
                timer.contador = moment.utc(moment.duration(Number(e), 'minutes').asMilliseconds()).format("HH[h ]mm[m]");
              } else {
                timer.contador = moment.utc(moment.duration(Number(e), 'minutes').asMilliseconds()).format("HH[h ]mm[m]");
              }
            }
          }
        });
      }
    }
  }

  startTarefa(timer: Timer) {
    let timerNovo = new Timer(timer.descricao, timer.nota, '0s', moment().toDate(), timer.fim);
    timerNovo.tempoCorrendo = true;
    this.timerList.push(timerNovo)


    let int = interval(1000).pipe(
      map((x) => {
        let seconds = x;
        if (x <= 60) {
          timerNovo.contador = String(x) + 's';
        } else {
           seconds %= 3600;
          if (x >= 3600) {
            timerNovo.contador = String(Math.floor(x / 3600)) + 'h ' + String(Math.floor(seconds / 60)) + 'm ' + seconds % 60 + 's'
          } else {
            timerNovo.contador = String(Math.floor(seconds / 60)) + 'm ' + seconds % 60 + 's'
          }
        }
      })
    );

    int.subscribe();
  }

  ngOnInit() {
    this.timerList.push(new Timer("Teste", null, "10h30m"))
    this.timerList.push(new Timer("Teste2", "Nota teste", "01h10m"))
    this.timerList.push(new Timer("Teste3", null, "30m"))

    this.dataTimer = moment().format("ddd[,] D MMMM");
  }

  totalHorasDiario() {
    let totalFinal = moment.duration();

    const regex = /[0-9]{1,2}[hms]{1,2}/g
    const regDigito = /[0-9]{1,2}/g

    this.timerList.forEach((tempo) => {
      const regMatch = tempo.contador.match(regex);
      if (regMatch != null) {
        regMatch.forEach((value) => {
          const resultado = value.match(regDigito)[0];
          if (value.includes("h")) {
            totalFinal.add(Number(resultado), 'hours')
          }
          if (value.includes("m")) {
            totalFinal.add(Number(resultado), 'minutes')
          }
        })
      }
    })
    return moment.utc(totalFinal.asMilliseconds()).format("HH[h ]mm[m ]");
  }

  onTimerNovo(evento: Timer) {
    this.timerList.push(evento);
  }

}
