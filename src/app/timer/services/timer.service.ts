import { Timer } from './../../shared/models/timer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { retry } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    
  })
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private readonly API = 'https://timerwork-api.herokuapp.com/timer';

  constructor(private http: HttpClient) { }

  list() {
    const url = `${this.API}/${moment().format('DD-MM-YYYY')}`
    return this.http.get<Timer[]>(url).pipe(
      retry(5)
    );
  }

  listPorData(data: string, comData: boolean) {
      if(comData) {
        const url = `${this.API}/${data}`
        return this.http.get<Timer[]>(url).pipe(
          retry(5)
        );
      }
      return this.list();
  }

  gravar(timer: Timer):Observable<Timer> {
    console.log('salvando: ', timer)
    return this.http.post<Timer>(this.API, timer, httpOptions );
  }

  atualiza(timer: Timer):Observable<Timer> {
    console.log('atualizando: ', timer);
    return this.http.put<Timer>(this.API, timer, httpOptions);
  }
}
