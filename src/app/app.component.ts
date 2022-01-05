import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngZal';
  showPage = 'intro';

  //zmiana strony
  public changePage(event: MouseEvent) {
    this.showPage = (event.target as HTMLButtonElement).value;
  }
}
