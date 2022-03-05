import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _router: Router) {}

  title = 'ngZal';

  public isLogged: boolean = false;
  public playerName: string = '';

  public getPlayerData($event: string) {
    this.playerName = $event;
  }

  public chanegeLoginStatus($event: boolean) {
    this.isLogged = $event;
  }
}
