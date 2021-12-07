import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatternHomeComponent } from './components/pattern-home/pattern-home.component';

const routes: Routes = [
  {
    path: '',
    component: PatternHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
