import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngZal';
  public showPage: String = 'intro';
  public isLogged: Boolean = false;
  public introDisabled: Boolean = false;

  //zmiana strony
  public changePage(event: MouseEvent) {
    this.showPage = (event.target as HTMLButtonElement).value;
    if (this.showPage === 'game') {
      this.introDisabled = true;
    }
  }

  public chanegeLoginStatus() {
    this.isLogged = true;
  }
}
