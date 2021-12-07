import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatternHomeComponent } from './components/pattern-home/pattern-home.component';
import { PatternBackgroundGenComponent } from './components/pattern-background-gen/pattern-background-gen.component';

@NgModule({
  declarations: [
    AppComponent,
    PatternHomeComponent,
    PatternBackgroundGenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
