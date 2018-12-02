import { HttpClientModule } from '@angular/common/http';
import { TimerService } from './services/timer.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimerComponent } from './timer.component';
import { TimerRoutingModule } from './timer.routing.module';
import { TimerManualComponent } from './timer-manual/timer-manual.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  imports: [
    CommonModule,
    TimerRoutingModule,
    FormsModule,
    ButtonModule,
    CalendarModule,
    BrowserAnimationsModule,
    HttpClientModule
    
  ],
  providers: [
    TimerService
  ],
  declarations: [
    TimerComponent,
    TimerManualComponent
  ]
})
export class TimerModule {
  
  
  constructor() {

  }
 }
