import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { IntroComponent } from './intro/intro.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [AppComponent, IntroComponent, GameComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
