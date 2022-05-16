//modules
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TetrisCoreModule } from 'ngx-tetris'; // game core
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

//pipes
import { SortByPipe } from './sort-by.pipe';
import { FilterByActionPipe } from './filter-by-action.pipe';

//components
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { GameComponent } from './game/game.component';
import { ModalComponent } from './game/modal/modal.component';
import { RouterModule } from '@angular/router';
import { Modal2Component } from './game/modal2/modal2.component';
import { SortByScorePipe } from './sort-by-score.pipe';
import { PlayerDataGuard } from './player-data.guard';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    GameComponent,
    ModalComponent,
    SortByPipe,
    FilterByActionPipe,
    Modal2Component,
    SortByScorePipe,
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'game/:color',
        component: GameComponent,
        canActivate: [PlayerDataGuard],
      },
      { path: 'intro', component: IntroComponent },
      { path: '**', redirectTo: 'intro' },
    ]),
    BrowserModule,
    TetrisCoreModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
