import { Component } from '@angular/core';
import { Player } from './game/game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngZal';
  public showPage: String = 'intro'; //change pages - intro/game
  public isLogged: Boolean = false;
  public player: Player = { name: '', email: '' };

  //zmiana strony
  public changePage($event: MouseEvent) {
    this.showPage = ($event.target as HTMLButtonElement).value;
  }

  //odbieram dane o graczu z intro
  public getPlayerData($event: any) {
    this.player.name = $event.name;
    this.player.email = $event.email;
  }

  public chanegeLoginStatus($event: Boolean) {
    this.isLogged = $event;
  }
}
