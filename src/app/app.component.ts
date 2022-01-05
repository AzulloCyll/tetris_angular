import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngZal';
  showPage = 'game';

  //zmiana strony
  public changePage(event: MouseEvent) {
    this.showPage = (event.target as HTMLButtonElement).value;
  }
}
