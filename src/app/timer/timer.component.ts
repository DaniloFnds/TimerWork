import { Timer } from './../shared/models/timer';
import { TimerService } from './services/timer.service';
import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import * as moment from 'moment';



@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timerList: Timer[] = [];
  totalHorasDiaria: string = ''

  constructor(private timerService: TimerService) { }

  atualizaContador(timer: Timer) {

    let entradaTimer = timer.contador.toLowerCase();

    const regex = /[0-9]{1,2}[hms]{1,2}/g

    let regMatch = entradaTimer.match(regex);

    if (regMatch != null) {
      regMatch.forEach((value) => {
        if (value.includes("h")) {

        }


      })
    }
    



    // while ((m = regex.exec(str)) !== null) {
    //     // This is necessary to avoid infinite loops with zero-width matches
    //     if (m.index === regex.lastIndex) {
    //         regex.lastIndex++;
    //     }

    //     // The result can be accessed through the `m`-variable.
    //     m.forEach((match, groupIndex) => {
    //         console.log(`Found match, group ${groupIndex}: ${match}`);
    //     });
    // }
  }

  // ngOnChanges() {
  //   console.log(`ngOnChanges - data is `);
  // }

  // ngDoCheck() {
  //   console.log("ngDoCheck")
  // }

  // ngAfterContentInit() {
  //   console.log("ngAfterContentInit");
  // }

  // ngAfterContentChecked() {
  //   console.log("ngAfterContentChecked");
  // }

  // ngAfterViewInit() {
  //   console.log("ngAfterViewInit");
  // }

  // ngAfterViewChecked() {
  //   console.log("ngAfterViewChecked");
  // }

  // ngOnDestroy() {
  //   console.log("ngOnDestroy");
  // }

  startTarefa(timer: Timer) {
    console.log(timer)
    this.timerList.push(new Timer(timer.descricao, timer.nota, '0s'))
  }

  ngOnInit() {
    console.log(`ngOnInit  - data is `);
    this.timerList.push(new Timer("Teste", null, "10h30m"))
    this.timerList.push(new Timer("Teste2", "Nota teste", "01h10m"))
    this.timerList.push(new Timer("Teste3", null, "30m"))
  }

  totalHorasDiario() {
    let totalFinal = moment.duration();

    const regex = /[0-9]{1,2}[hms]{1,2}/g
    const regDigito = /[0-9]{1,2}/g

    this.timerList.forEach((tempo) => {
      let regMatch = tempo.contador.match(regex);
      if (regMatch != null) {
        regMatch.forEach((value) => {
          let resultado = value.match(regDigito)[0];
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

}
