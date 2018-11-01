import { TimerComponent } from './timer/timer.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const appRoutes: Routes = [
    { path: '', component: TimerComponent},
    { path: 'timer', component: TimerComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}