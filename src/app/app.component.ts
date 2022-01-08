import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngZal';
  public showPage: String = 'intro'; //change pages - intro/game
  public isLogged: Boolean = false;

  //zmiana strony
  public changePage($event: MouseEvent) {
    this.showPage = ($event.target as HTMLButtonElement).value;
  }

  //zmiana statusu login - true: aktywuje pole do loginu
  public chanegeLoginStatus($event: Boolean) {
    this.isLogged = $event;
  }
}
