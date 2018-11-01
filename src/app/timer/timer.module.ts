import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerComponent } from './timer.component';
import { TimerRoutingModule } from './timer.routing.module';
import { TimerManualComponent } from './timer-manual/timer-manual.component';

@NgModule({
  imports: [
    CommonModule,
    TimerRoutingModule
    
  ],
  declarations: [
    TimerComponent,
    TimerManualComponent
  ]
})
export class TimerModule { }
