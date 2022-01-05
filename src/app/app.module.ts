import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { IntroComponent } from './intro/intro.component';
import { GameComponent } from './game/game.component';
import { ScoresComponent } from './scores/scores.component';

import { TetrisCoreModule } from 'ngx-tetris';

@NgModule({
  declarations: [AppComponent, IntroComponent, GameComponent, ScoresComponent],
  imports: [BrowserModule, TetrisCoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
