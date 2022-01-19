import { Component } from '@angular/core';
import { Player } from './game/game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngZal';
  public showPage: string = 'intro'; //change pages - intro/game

  public isLogged: boolean = false;
  public player: Player = { name: '', email: '' };

  public changePage($event: MouseEvent) {
    this.showPage = ($event.target as HTMLButtonElement).value;
  }

  public getPlayerData($event: Player) {
    this.player.name = $event.name;
    this.player.email = $event.email;
  }

  public chanegeLoginStatus($event: boolean) {
    this.isLogged = $event;
  }
}
