//modules
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TetrisCoreModule } from 'ngx-tetris'; // game core
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//pipes
import { SortByPipe } from './sort-by.pipe';
import { FilterByActionPipe } from './filter-by-action.pipe';

//components
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { GameComponent } from './game/game.component';
import { ModalComponent } from './game/modal/modal.component';

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
		FontAwesomeModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
