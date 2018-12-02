import { Timer } from './../shared/models/timer';
import { TimerService } from './services/timer.service';
import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
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
  contadorSubs: Subscription;
  momDateTimer: moment.Moment;
  dataDiferenteAtual: boolean = true;

  constructor(private timerService: TimerService) { }

  atualizaContador(timer: Timer) {
    let entradaTimer = timer.contador.toLowerCase();
    const regex = /[0-9]{1,2}[hms]{1,2}/g

    let regMatch = entradaTimer.match(regex);
    if (regMatch != null) {
      regMatch.forEach((value) => {
        console.log(value)
        if (value.includes("h")) {
            console.log(value)
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
   this.timerService.atualiza(timer).subscribe()
  }

  startTarefa(timer: Timer) {
     if(timer.tempoCorrendo) {
        timer.tempoCorrendo = false;
        timer.fim = new Date();
        this.timerService.atualiza(timer).subscribe();
        this.contadorSubs.unsubscribe();
        return;
     }

    let timerNovo = new Timer(timer.descricao, timer.nota, '0s', this.momDateTimer.format('DD-MM-YYYY'), new Date(), null, true );
    this.timerService.gravar(timerNovo)
     .pipe().subscribe((timerSalvo) => {
        timerNovo.id = timerSalvo.id;
     });

     this.timerList.push(timerNovo);
     console.log(this.timerList);

    this.contadorSubs = interval(1000).pipe(
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
    ).subscribe();
  }

  private registrarTimerCorrendo(timer: Timer) {
    const inico = moment(timer.inicio);
    const fim = moment(new Date());
    let registrouTempoCorrendo: boolean = timer.tempoCorrendo;
    let cron: number = 0;
    this.contadorSubs = interval(1000).pipe(
      map((x) => {
        if(registrouTempoCorrendo) {
           cron = fim.diff(inico, 'seconds');
           registrouTempoCorrendo = false;
        }
        cron = cron + x;
        let seconds = cron;
        if (cron <= 60) {
          timer.contador = String(cron) + 's';
        } else {
           seconds %= 3600;
          if (cron >= 3600) {
            timer.contador = String(Math.floor(cron / 3600)) + 'h ' + String(Math.floor(seconds / 60)) + 'm ' + seconds % 60 + 's'
          } else {
            timer.contador = String(Math.floor(seconds / 60)) + 'm ' + seconds % 60 + 's'
          }
        }
      })
    ).subscribe();
  }

  ngOnInit() {
    this.dataTimer = moment().format("ddd[,] D MMMM");
    this.momDateTimer = moment();
    this.pesquisar(null, false);
  }

  private pesquisar(data: string, comData: boolean) {
    this.timerService.listPorData(data, comData).pipe(
      map((item) => {
        let result:Array<Timer> = [];
          item.forEach((t) => {
            if(t.tempoCorrendo) {
              let timer = new Timer(t.descricao, t.nota, t.contador, t.dataLancamento, t.inicio, t.fim, t.tempoCorrendo);
              timer.id = t.id;
              this.registrarTimerCorrendo(timer);
              result.push(timer)
            } else {
              let timer = new Timer(t.descricao, t.nota, t.contador, t.dataLancamento, t.inicio, t.fim, t.tempoCorrendo);
              timer.id = t.id;
              result.push(timer)
            }
          });
        return result;
      })
    ).subscribe(timers => this.timerList = timers)
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

  onTimerNovo(timer: Timer) {
    timer.dataLancamento =  this.momDateTimer.format('DD-MM-YYYY')
    this.timerService.gravar(timer).subscribe();
    this.timerList.push(timer);
  }

  diasAnteriores() {
      let data  = this.momDateTimer.subtract(1, 'days');
      this.dataTimer = data.format("ddd[,] D MMMM");
      this.pesquisar(data.format('DD-MM-YYYY'), true);
      this.dataDiferenteAtual = moment(data.format('YYYY-MM-DD')).isSame(moment(moment().format('YYYY-MM-DD')));
      console.log(!this.dataDiferenteAtual)
  }

  proximosDias() {
    let data  = this.momDateTimer.add(1, 'days');
    this.dataTimer = data.format("ddd[,] D MMMM");
    this.pesquisar(data.format('DD-MM-YYYY'), true);
    this.dataDiferenteAtual = moment(data.format('YYYY-MM-DD')).isSame(moment(moment().format('YYYY-MM-DD')));
    console.log(!this.dataDiferenteAtual)
  }

  irDiaAtual() {
    let data  = this.momDateTimer = moment();
    this.dataTimer = data.format("ddd[,] D MMMM");
    this.pesquisar(data.format('DD-MM-YYYY'), true);
    this.dataDiferenteAtual = true;
  }

  ngOnDestroy() {
    this.contadorSubs.unsubscribe();
  }

}
