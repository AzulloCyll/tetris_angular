import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { GameComponent } from './game/game.component';
import { ModalComponent } from './game/modal/modal.component';

import { TetrisCoreModule } from 'ngx-tetris'; // game core

import { SortByPipe } from './sort-by.pipe';
import { FilterByActionPipe } from './filter-by-action.pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [
		AppComponent,
		IntroComponent,
		GameComponent,
		ModalComponent,
		SortByPipe,
		FilterByActionPipe
	],
	imports: [
		FormsModule,
		BrowserModule,
		TetrisCoreModule,
		ReactiveFormsModule,
		FontAwesomeModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
