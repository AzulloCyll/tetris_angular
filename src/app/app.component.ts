import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngZal';
  public showPage: String = 'game'; //change pages - intro/game
  public isLogged: Boolean = false;

  //zmiana strony
  public changePage($event: MouseEvent) {
    this.showPage = ($event.target as HTMLButtonElement).value;
  }

  public chanegeLoginStatus($event: Boolean) {
    this.isLogged = $event;
  }
}
