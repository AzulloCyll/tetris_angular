import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngZal';
  public showPage: String = 'intro';
  public isLogged: Boolean = true;

  //zmiana strony
  public changePage(event: MouseEvent) {
    this.showPage = (event.target as HTMLButtonElement).value;
  }
}
