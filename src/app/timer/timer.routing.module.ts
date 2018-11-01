import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { TimerComponent } from "./timer.component";


const timerRoutes: Routes = [
    { path: 'timer', component: TimerComponent}
]

@NgModule({
    imports: [RouterModule.forChild(timerRoutes)],
    exports: [RouterModule]
})
export class TimerRoutingModule {}