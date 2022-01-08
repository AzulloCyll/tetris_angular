import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // do formularzy

import { IntroComponent } from './intro/intro.component';
import { GameComponent } from './game/game.component';

import { TetrisCoreModule } from 'ngx-tetris'; // game core

@NgModule({
  declarations: [AppComponent, IntroComponent, GameComponent],
  imports: [BrowserModule, TetrisCoreModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
