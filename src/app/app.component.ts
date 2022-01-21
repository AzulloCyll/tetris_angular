import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngZal';
  public showPage: string = 'game'; //change pages - intro/game

  public isLogged: Boolean = false;
  public playerName: string = '';

  public changePage($event: MouseEvent) {
    this.showPage = ($event.target as HTMLButtonElement).value;
  }

  public getPlayerData($event: string) {
    this.playerName = $event;
  }

  public chanegeLoginStatus($event: boolean) {
    this.isLogged = $event;
  }
}
