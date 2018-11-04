import { TimerService } from './services/timer.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimerComponent } from './timer.component';
import { TimerRoutingModule } from './timer.routing.module';
import { TimerManualComponent } from './timer-manual/timer-manual.component';

@NgModule({
  imports: [
    CommonModule,
    TimerRoutingModule,
    FormsModule
  ],
  providers: [
    TimerService
  ],
  declarations: [
    TimerComponent,
    TimerManualComponent
  ]
})
export class TimerModule { }
